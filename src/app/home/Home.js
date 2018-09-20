import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Navbar from './navbar/Navbar';
import Slidedown from './slidedown/Slidedown';
import Peers from './peers/Peers';
import Github from './github/Github';
import Geek from './geek/Geek';
import Chain from './chain/Chain';
import Copyright from './copyright/Copyright';
import DotSpinner from '../common/ui/dot-spinner/DotSpinner';
import TABS from '../common/constants/tabs';

import { unsetTab } from '../common/state/newui/index';
import './Home.css';

const tabMap = new Map([
  [TABS.PEERS, Peers],
  [TABS.GITHUB, Github],
  [TABS.GEEK, Geek],
]);

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
  }

  handleCloseIconClick() {
    this.props.unsetTab();
  }

  render() {
    let { blocks, chain, tab, viewportType } = this.props;
    let TabComponent = tabMap.get(tab);
    let blocklist = chain.map(hash => blocks[hash]);

    return (
      <div className="Home">
        <Navbar />
        <Slidedown open={!!tab}
          onCloseIconClick={this.handleCloseIconClick}>
          {TabComponent && <TabComponent />}
        </Slidedown>
        {!blocklist.length && (
          <div className="spinner-container">
            <DotSpinner />
            <div>
              Fetching blocks from network... usually it takes about couple minutes.
            </div>
          </div>
        )}
        <Chain blocklist={blocklist} />
        {viewportType === 'VIEWPORT_DESKTOP' && (
          <div className="copyright-container font-tiny">
            <Copyright />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    blocks: state.blockchain.blocks,
    chain: state.blockchain.chain,
    tab: state.newui.tab,
    viewportType: state.ui.viewportType
  }),
  dispatch => ({
    unsetTab() {
      dispatch(unsetTab());
    }
  })
)(Home));

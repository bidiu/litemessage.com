import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Navbar from './navbar/Navbar';
import Slidedown from './slidedown/Slidedown';
import Peers from './peers/Peers';
import Github from './github/Github';
import Geek from './geek/Geek';
import Chain from './chain/Chain';
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
    let { blocks, chain, tab } = this.props;
    let TabComponent = tabMap.get(tab);
    let blocklist = chain.map(hash => blocks[hash]);

    return (
      <div className="Home">
        <Navbar />
        <Slidedown open={!!tab}
          onCloseIconClick={this.handleCloseIconClick}>
          {TabComponent && <TabComponent />}
        </Slidedown>
        <Chain blocklist={blocklist} />
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    blocks: state.blockchain.blocks,
    chain: state.blockchain.chain,
    tab: state.newui.tab
  }),
  dispatch => ({
    unsetTab() {
      dispatch( unsetTab() );
    }
  })
)(Home));

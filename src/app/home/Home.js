import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Navbar from './navbar/Navbar';
import Slidedown from './slidedown/Slidedown';
import Github from './github/Github';
import Geek from './geek/Geek';
import Peers from './peers/Peers';
import HistoryMsgs from './history-msgs/HistoryMsgs';
import PendingMsgs from './pending-msgs/PendingMsgs';
import Chain from './chain/Chain';
import Copyright from './copyright/Copyright';
import TABS from '../common/constants/tabs';

import { unsetTab } from '../common/state/newui/index';
import './Home.css';

const tabMap = new Map([
  [TABS.PEERS, Peers],
  [TABS.GITHUB, Github],
  [TABS.GEEK, Geek],
]);

const carouselConfig = {
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  accessibility: false,
};

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
        <div style={{ height: 100 }}></div>

        {viewportType !== 'VIEWPORT_DESKTOP' && (
          <div className="Home-peers-mobile">
            <Peers />
          </div>
        )}

        <div className="Home-content">
          {/* sidebar */}
          {viewportType === 'VIEWPORT_DESKTOP' && (
            <div className="Home-sidebar">
              <div className="Home-peers">
                <Peers carouselConfig={carouselConfig} className="peers-in-sidebar" />
              </div>
              <HistoryMsgs />
            </div>
          )}

          {/* main */}
          <div className="Home-main">
            {viewportType !== 'VIEWPORT_DESKTOP' && (
              <HistoryMsgs />
            )}
            <PendingMsgs />
            <Chain blocklist={blocklist} />
          </div>
        </div>

        {/* copyright */}
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

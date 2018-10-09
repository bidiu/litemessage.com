import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import LitemessageWorker from 'workerize-loader!./litemessage.worker'; // eslint-disable-line
import store from './bootstrap/store';
import BlockchainContext from './blockchain-context';
import BlockchainManager from './blockchain-manager';
import Particles from 'particlesjs/dist/particles';
import ViewportQuery from './common/ui/viewports/ViewportQuery';
import BannerList from './common/ui/banners/BannerList';
import ToastList from './common/ui/toasts/ToastList';
import Home from './home/Home';
import { getScrollBarWidth } from './utils/domUtils';

import { setScrollbarWidth } from './common/state/newui/index';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.blockchainManager = new BlockchainManager(LitemessageWorker, store);
  }

  componentDidMount() {
    // draw the background with particle effects
    Particles.init({
      selector: '#particles',
      maxParticles: 30,
      connectParticles: true,
      speed: .2,
      color: '#ffffff',
      sizeVariations: 6,
      responsive: [
        {
          breakpoint: 1024,
          options: {
            maxParticles: 20
          }
        },
        {
          breakpoint: 768,
          options: {
            maxParticles: 0
          }
        }
      ]
    });

    // set scrollbar width
    this.props.setScrollbarWidth(getScrollBarWidth());
  }

  componentWillUnmount() {
    this.blockchainManager.close();
  }

  render() {
    let blockchainManager = this.blockchainManager;
    let viewportType = this.props.viewportType;

    return (
      <div className={`App ${viewportType}`}>
        <ViewportQuery />
        <BannerList />
        <ToastList />

        <BlockchainContext.Provider value={{ blockchainManager }}>
          {/* the main content of the app */}
          <Home />
        </BlockchainContext.Provider>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType,
  }),
  dispatch => ({
    setScrollbarWidth(width) {
      dispatch(setScrollbarWidth(width));
    }
  })
)(App));

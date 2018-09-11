import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import LitemessageWorker from 'workerize-loader!./litemessage.worker'; // eslint-disable-line
import store from './bootstrap/store';
import BlockchainManager from './blockchain-manager';
import Particles from 'particlesjs/dist/particles';
import ViewportQuery from './common/ui/viewports/ViewportQuery';
import BannerList from './common/ui/banners/BannerList';
import ToastList from './common/ui/toasts/ToastList';
import Home from './home/Home';

import './App.css';

class App extends Component {
  componentDidMount() {
    // draw the background with particle effects
    Particles.init({
      selector: '#particles',
      maxParticles: 60,
      connectParticles: true,
      speed: .2,
      color: '#cccccc'
    });

    this.blockchainManager = new BlockchainManager(LitemessageWorker, store);
  }

  render() {
    let viewportType = this.props.viewportType;

    return (
      <div className={`App ${viewportType}`}>
        <ViewportQuery />
        <BannerList />
        <ToastList />

        {/* the main content of the app */}
        <Home />
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType,
  }),
  dispatch => ({})
)(App));

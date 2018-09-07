import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Particles from 'particlesjs/dist/particles';
import ViewportQuery from './common/ui/viewports/ViewportQuery';
import BannerList from './common/ui/banners/BannerList';
import ToastList from './common/ui/toasts/ToastList';
import Home from './home/Home';
import env from './env/environment';

import worker from 'workerize-loader!./litemessage.worker'; // eslint-disable-line

import { pushBlocks } from './common/state/blockchain/index';
import './App.css';

class App extends Component {
  componentDidMount() {
    // draw the background with particle effects
    Particles.init({
      selector: '#particles',
      maxParticles: 50,
      connectParticles: true,
      speed: .2,
      color: '#cccccc'
    });

    // create the litemessage worker
    this.worker = worker();
    // join into the network
    this.worker.createNode('litemessage', env.initPeerUrls);

    setTimeout(async () => {
      this.props.pushBlocks(await this.worker.getBlocks());

    }, 3000);
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
  dispatch => ({
    pushBlocks(blocks) {
      dispatch(pushBlocks(blocks));
    }
  })
)(App));

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Particles from 'particlesjs/dist/particles';
import { ThinNode } from 'litemessage/dist/litemessage.umd';
import ViewportQuery from './common/ui/viewports/ViewportQuery';
import BannerList from './common/ui/banners/BannerList';
import ToastList from './common/ui/toasts/ToastList';
import Navbar from './navbar/Navbar';
import env from './env/environment';

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

    // join into the network
    this.node = new ThinNode('litemessage', { initPeerUrls: env.initPeerUrls });
  }

  render() {
    let viewportType = this.props.viewportType;

    return (
      <div className={`App ${viewportType}`}>
        <ViewportQuery />
        <BannerList />
        <ToastList />

        {/* the main content of the app */}
        <Navbar />
        <div>Hello, world.</div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType
  }),
  dispatch => ({})
)(App));

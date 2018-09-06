import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import ViewportQuery from './common/ui/viewports/ViewportQuery';
import BannerList from './common/ui/banners/BannerList';
import ToastList from './common/ui/toasts/ToastList';

import './App.css';

class App extends Component {
  render() {
    let viewportType = this.props.viewportType;

    return (
      <div className={`App ${viewportType}`}>
        <ViewportQuery />
        <BannerList />
        <ToastList />
        {/* the main content of the app */}
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

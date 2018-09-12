import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Observable } from 'rxjs/Observable';
import BurgerMenu from '../../common/ui/burger/BurgerMenu';
import TABS from '../../common/constants/tabs';

import { setTab, unsetTab } from '../../common/state/newui/index';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      sidebarOpen: false
    };
  }

  handleTabClick(tab) {
    this.setState({ sidebarOpen: false });

    if (this.props.tab === tab) {
      this.props.unsetTab();
    } else {
      this.props.setTab(tab);
    }
  }

  componentDidMount() {
    this.subscriptions = [
      Observable.fromEvent(window, 'scroll')
        .subscribe(() => {
          if (window.scrollY > 120) {
            this.setState({ collapse: true });
          } else {
            this.setState({ collapse: false });
          }
        })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  render() {
    let { viewportType } = this.props;
    let { collapse, sidebarOpen } = this.state;

    let tabs = (
      <Fragment>
        <div className="tab" onClick={this.handleTabClick.bind(this, TABS.PEERS)}>
          <i className="fab fa-connectdevelop"></i>
          <span>Peers</span>
        </div>
        <div className="tab" onClick={this.handleTabClick.bind(this, TABS.GITHUB)}>
          <i className="fab fa-github"></i>
          <span className="github">Github</span>
        </div>
        <div className="tab" onClick={this.handleTabClick.bind(this, TABS.GEEK)}>
          <i className="far fa-laugh"></i>
          <span>Geek</span>
        </div>
        <div className="tab">
          <i className="fas fa-question-circle"></i>
          <span>About</span>
        </div>
      </Fragment>
    );

    return (
      <div className={`Navbar font-primary ${collapse ? 'collapse' : ''}`}>
        <div className="logo">
          <a className="logo-anchor" href="#">litemessage</a>
        </div>
        {viewportType === 'VIEWPORT_DESKTOP' ? tabs : (
          <BurgerMenu open={sidebarOpen}
            onMenuIconClick={() => this.setState({ sidebarOpen: true })}
            onCloseIconClick={() => this.setState({ sidebarOpen: false })}>
            {tabs}
          </BurgerMenu>
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType,
    tab: state.newui.tab
  }),
  dispatch => ({
    setTab(tab) {
      dispatch( setTab(tab) );
    },
    unsetTab() {
      dispatch( unsetTab() );
    }
  })
)(Navbar));

import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Observable } from 'rxjs/Observable';
import Copyright from '../copyright/Copyright';
import BurgerMenu from '../../common/ui/burger/BurgerMenu';
import TABS from '../../common/constants/tabs';

import { setTab, unsetTab } from '../../common/state/newui/index';
import logoInLightBg from '../../assets/litemessage_light_bg.svg';
import logoInDarkBg from '../../assets/litemessage_dark_bg.svg';
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
        .throttleTime(50)
        .subscribe(() => {
          let { collapse } = this.state;

          if (window.scrollY > 120 && !collapse) {
            this.setState({ collapse: true });
          } else if (window.scrollY <= 120 && collapse) {
            this.setState({ collapse: false });
          }
        })
    ];

    this.timers = [
      setInterval(() => {
        let { collapse } = this.state;

        if (window.scrollY <= 120 && collapse) {
          this.setState({ collapse: false });
        }
      }, 500)
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.timers.forEach(t => clearInterval(t));
  }

  render() {
    let { viewportType, scrollbar } = this.props;
    let { collapse, sidebarOpen } = this.state;

    let { width, hide } = scrollbar;
    let style = hide ? { paddingRight: 20 + width } : {};

    let tabs = (
      <Fragment>
        <button className="tab btn-link" onClick={this.handleTabClick.bind(this, TABS.GITHUB)}>
          <i className="fab fa-github"></i>
          <span className="github">Github</span>
        </button>
        <button className="tab btn-link" onClick={this.handleTabClick.bind(this, TABS.GEEK)}>
          <i className="fab fa-connectdevelop"></i>
          <span>Geeks</span>
        </button>
        <button className="tab btn-link">
          <i className="fas fa-question-circle"></i>
          <span>About</span>
        </button>
      </Fragment>
    );

    return (
      <div className={`Navbar font-primary-light ${collapse ? 'collapse' : ''}`} style={style}>
        <div className="logo">
          <a className="logo-anchor" href="/">
            <img className="logo-img" src={collapse ? logoInDarkBg : logoInLightBg} 
              alt="litmessage logo" />
          </a>
        </div>
        {viewportType === 'VIEWPORT_DESKTOP' ? tabs : (
          <BurgerMenu open={sidebarOpen}
            onMenuIconClick={() => this.setState({ sidebarOpen: true })}
            onCloseIconClick={() => this.setState({ sidebarOpen: false })}>
            {tabs}
            <div className="sidebar-copyright-container font-tiny">
              <Copyright />
            </div>
          </BurgerMenu>
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType,
    tab: state.newui.tab,
    scrollbar: state.newui.scrollbar
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

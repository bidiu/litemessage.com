import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
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
    let { collapse } = this.state;

    return (
      <div className={`Navbar font-primary ${collapse ? 'collapse' : ''}`}>
        <div className="logo">
          <a className="logo-anchor" href="#">litemessage</a>
        </div>
        <div className="tab">
          <i className="fab fa-connectdevelop"></i>
          <span>Peers</span>
        </div>
        <div className="tab">
          <i className="fab fa-github"></i>
          <span className="github">Github</span>
        </div>
        <div className="tab">
          <i className="far fa-laugh"></i>
          <span>Geek</span>
        </div>
        <div className="tab">
          <i className="fas fa-question-circle"></i>
          <span>About</span>
        </div>
      </div>
    );
  }
}

export default Navbar;

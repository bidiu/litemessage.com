import React, { Component } from 'react';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar font-primary-bold">
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
          <i className="fas fa-terminal"></i>
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

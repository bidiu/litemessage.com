import React, { Component } from 'react';

import './Slidedown.css';

class Slidedown extends Component {
  constructor(props) {
    super(props);
    this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
  }

  handleCloseIconClick(event) {
    this.props.onCloseIconClick(event);
  }

  render() {
    let { open } = this.props;

    return (
      <div className={`Slidedown ${open ? 'open' : ''}`}>
        <div className="sd-overlay"></div>
        <i className="material-icons close-icon"
          onClick={this.handleCloseIconClick}>
          close
        </i>
        {open && this.props.children}
      </div>
    );
  }
}

export default Slidedown;

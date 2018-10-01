import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';

import './Litemessage.css';

class Litemessage extends Component {
  render() {
    let { litemsg, index, total } = this.props;
    let utc = new Date(litemsg.time).toUTCString();

    return (
      <div className="Litemessage">
        <div className="Litemessage-title text-truncate">
          <span>{`(${index + 1}/${total}) `}</span>
          <span>{litemsg.hash}</span>
        </div>

        <div className="Litemessage-subtitle font-tiny">
          {utc}
        </div>

        {/* will render a div */}
        <TextTruncate 
          line={4} containerClassName="Litemessage-content font-small"
          text={litemsg.litemsg} />
      </div>
    );
  }
}

export default Litemessage;

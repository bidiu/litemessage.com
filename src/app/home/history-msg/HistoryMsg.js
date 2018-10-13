import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';

import './HistoryMsg.css';

class HistoryMsg extends Component {
  render() {
    let { hash: litemsgId, litemsg, time } = this.props;
    let utc = new Date(time).toUTCString();

    return (
      <div className="HistoryMsg">
        <div className="text-truncate font-tiny-light console-print">{litemsgId}</div>
        {/* will render a div */}
        <TextTruncate 
          line={3} containerClassName="hm-content font-small"
          text={litemsg} />
        <div className="hm-utc font-tiny-light">{utc}</div>
      </div>
    );
  }
}

export default HistoryMsg;

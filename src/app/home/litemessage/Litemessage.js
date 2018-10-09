import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';

import './Litemessage.css';

class Litemessage extends Component {
  render() {
    let { litemsg, index, total } = this.props;
    let utc = new Date(litemsg.time).toUTCString();

    return (
      <div className="Litemessage">
        <div className="Litemessage-title">
          <span className="Litemessage-title-text font-big text-color-primary">
            {!!(index + 1) && !!total ?
              `(${index + 1}/${total})` :
              'litemessage'
            }
          </span>
          <span className="Litemessage-title-hash font-tiny-light text-truncate console-print">
            {litemsg.hash}
          </span>
        </div>

        <div className="Litemessage-subtitle font-tiny-light">
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

import React, { Component } from 'react';
import LitemsgForm from '../litemsg-form/LitemsgForm';
import Litemessage from '../litemessage/Litemessage';
import DotSpinnerVar1 from '../../common/ui/dot-spinner-var1/DotSpinnerVar1';

import './PendingMsg.css';

class PendingMsg extends Component {
  render() {
    let { litemsg, sentAt, timeout, blockId } = this.props;
    let body = null, msgState = null;

    if (litemsg) {
      body = <Litemessage litemsg={litemsg} />;
    } else {
      body = <LitemsgForm />;
    }

    if (blockId) {
      msgState = 'msg-success';

    } else if (timeout) {
      msgState = 'msg-timeout';

    } else if (sentAt) {
      msgState = 'msg-waiting';
    }
    
    return (
      <div className={`PendingMsg ${msgState || ''}`}>
        {body}
        <div className="PendingMsg-overlay">
          {/* waiting overlay */}
          {msgState === 'msg-waiting' && (
            <DotSpinnerVar1 
              className="PendingMsg-waiting-spinner text-color-primary"
              text="Waiting peers to mine the next block that contains this litemessage. It could take from few seconds to a couple of minutes." />
          )}

          {/* timeout overlay */}
          {msgState === 'msg-timeout' && (
            'timeout...'
          )}

          {/* success overlay */}
          {msgState === 'msg-success' && (
            'success...'
          )}
        </div>
      </div>
    );
  }
}

export default PendingMsg;

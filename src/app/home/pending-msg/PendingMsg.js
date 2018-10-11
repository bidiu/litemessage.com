import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import LitemsgForm from '../litemsg-form/LitemsgForm';
import Litemessage from '../litemessage/Litemessage';
import DotSpinnerVar1 from '../../common/ui/dot-spinner-var1/DotSpinnerVar1';
import ButtonLink from '../../common/ui/buttons/button-link/ButtonLink';

import { resetMsg } from '../../common/state/litemsgs/index';
import './PendingMsg.css';

class PendingMsg extends Component {
  handleResendBtnClick = () => {
    let { pendingId, resetMsg } = this.props;

    resetMsg(pendingId);
  };

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
        <div className="PendingMsg-overlay text-color-primary">
          {/* waiting overlay */}
          {msgState === 'msg-waiting' && (
            <DotSpinnerVar1 
              className="PendingMsg-waiting-spinner"
              text="Waiting peers to mine the next block that contains this litemessage. It could take from few seconds to a couple of minutes." />
          )}

          {/* timeout overlay */}
          {msgState === 'msg-timeout' && (
            <div>
              It timeouts. Maybe it got lost in the network, 
              or the block is forked off the main branch.&nbsp;
              <ButtonLink onClick={this.handleResendBtnClick}>Try resend.</ButtonLink>
            </div>
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

export default withRouter(connect(
  state => ({}),
  dispatch => ({
    resetMsg(pendingId) {
      dispatch(resetMsg(pendingId));
    }
  })
)(PendingMsg));

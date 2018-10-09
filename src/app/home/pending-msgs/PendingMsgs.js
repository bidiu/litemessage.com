import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import PendingMsg from '../pending-msg/PendingMsg';

import './PendingMsgs.css';

class PendingMsgs extends Component {
  render() {
    let { pendingMsgs } = this.props;

    return (
      <div className="PendingMsgs">
        {pendingMsgs.map(pendingMsg => (
          <PendingMsg key={pendingMsg.pendingId} {...pendingMsg} />
        ))}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    pendingMsgs: state.litemsgs.pendingQueue
  }),
  dispatch => ({})
)(PendingMsgs));

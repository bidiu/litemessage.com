import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { TransitionGroup } from 'react-transition-group';
import ExpandFade from '../../common/ui/expand-fade/ExpandFade';
import PendingMsg from '../pending-msg/PendingMsg';

import './PendingMsgs.css';

class PendingMsgs extends Component {
  render() {
    let { pendingMsgs } = this.props;

    return (
      <div className="PendingMsgs">
        <TransitionGroup component={null}>
          {pendingMsgs.map(pendingMsg => (
            <ExpandFade key={pendingMsg.pendingId}>
              <PendingMsg {...pendingMsg} />
            </ExpandFade>
          ))}
        </TransitionGroup>
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

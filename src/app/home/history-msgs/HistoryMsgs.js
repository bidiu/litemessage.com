import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import HistoryMsg from '../history-msg/HistoryMsg';
import LineDelimiter from '../../common/ui/line-delimiter/LineDelimiter';

import './HistoryMsgs.css';

const Empty = () => (
  <div className="hms-empty">
    Your sent messages will show up here.
  </div>
);

class HistoryMsgs extends Component {
  render() {
    let { litemsgs, historyMsgs } = this.props;

    return (
      <div className="HistoryMsgs">
        <div className="hms-header font-primary-bold">
          History Messages
        </div>
        <LineDelimiter />
        <div className="hms-content">
          {!!historyMsgs.length && historyMsgs.map(({ litemsgId, blockId }) => (
            <React.Fragment key={litemsgId}>
              <HistoryMsg {...litemsgs[litemsgId]} blockId={blockId} />
              <LineDelimiter />
            </React.Fragment>
          ))}
          {
            !historyMsgs.length && <Empty />
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    litemsgs: state.litemsgs.litemsgs,
    historyMsgs: state.litemsgs.historyMsgs
  }),
  dispatch => ({})
)(HistoryMsgs));

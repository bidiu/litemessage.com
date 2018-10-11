import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Textarea from '../../common/ui/textarea/Textarea';
import ButtonVar2 from '../../common/ui/buttons/button-var2/ButtonVar2';
import NotificationEntry from '../../common/state/notifications/notificationEntry';
import { createLitemsg } from '../../utils/blockchainUtils';
import uuidv1 from 'uuid/v1';

import { setMsg } from '../../common/state/litemsgs/index';
import { addNotification } from '../../common/state/notifications/reducer';
import './LitemsgForm.css'

class LitemsgForm extends Component {
  constructor(props) {
    super(props);
    this.textareaId = uuidv1();
    this.state = { content: "" };
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let content = this.state.content.trim();
    this.setState({ content });
    if (!content) {
      this.props.addNotification(new NotificationEntry({
        message: 'Please enter something before clicking submit.',
        timeout: 3000
      }));
      return;
    }

    this.props.setMsg(createLitemsg(content), uuidv1());
  };

  render() {
    let { content } = this.state;

    return (
      <form className="LitemsgForm" onSubmit={this.handleSubmit}>
        <div className="pm-title font-big-bold">
          Put down a litemessage
        </div>
        <label htmlFor={this.textareaId}
          className="visuallyhidden">
          Enter anything here, and let it be part of the blockchian.
        </label>
        <Textarea 
          ref={el => this.textarea = el}
          name="content"
          value={content}
          onChange={this.handleChange}
          id={this.textareaId}
          className="content-textarea" 
          placeholder="Enter anything here, and let it be part of the blockchian." />
        <div className="pm-submit-container">
          <ButtonVar2 type="submit" className="pm-submit-btn">Submit</ButtonVar2>
        </div>
      </form>
    );
  }
}

export default withRouter(connect(
  state => ({}),
  dispatch => ({
    setMsg(litemsg, nextPendingId) {
      dispatch(setMsg(litemsg, nextPendingId));
    },
    addNotification(entry) {
      dispatch(addNotification(entry));
    }
  })
)(LitemsgForm));

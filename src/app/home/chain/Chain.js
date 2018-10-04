import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Block from '../block/Block';
import DotSpinnerVar1 from '../../common/ui/dot-spinner-var1/DotSpinnerVar1';

import './Chain.css';

class Chain extends Component {
  render() {
    let { blocklist } = this.props;

    return (
      <div className="Chain">
        {!blocklist.length && (
          <DotSpinnerVar1 text="Fetching blocks from peers... usually it takes about couple minutes."
            className="Chain-spinner" />
        )}
        {[...blocklist].reverse().map(block => (
          <Block key={block.hash} block={block} onClick={this.handleBlockClick} />
        ))}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType
  }),
  dispatch => ({})
)(Chain));

import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import BlockchainContext from '../../blockchain-context';
import BlockchainManager from '../../blockchain-manager';
import Block from '../block/Block';
import { TransitionGroup } from 'react-transition-group';
import FakeExpandFake from '../../common/ui/fake-expand-fade/FakeExpandFade';
import DotSpinnerVar1 from '../../common/ui/dot-spinner-var1/DotSpinnerVar1';

import { unshiftBlocks } from '../../common/state/blockchain/index';
import './Chain.css';

const PAGE_SIZE = BlockchainManager.PAGE_SIZE;

class Chain extends Component {
  componentDidMount() {
    this.timer = setInterval(async () => {
      let vpHeight = window.innerHeight;
      let bottomDistance = Math.round(document.body.scrollHeight 
        - window.scrollY - vpHeight);
      if (bottomDistance > 2 * vpHeight) { return; }

      let { blockchainManager, blocklist, unshiftBlocks } = this.props;
      if (!blocklist.length || !blocklist[0].height) { return; }

      let subChain = await blockchainManager
        .getSubBlockchain(blocklist[0].hash, PAGE_SIZE);
      unshiftBlocks(subChain);

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    let { blocklist } = this.props;

    return (
      <div className="Chain">
        {!blocklist.length && (
          <DotSpinnerVar1 text="Fetching blocks from peers... usually it takes about couple minutes."
            className="Chain-spinner" />
        )}
        <TransitionGroup component={null}>
          {[...blocklist].reverse().map(block => (
            <FakeExpandFake key={block.hash}>
              <Block block={block} onClick={this.handleBlockClick} />
            </FakeExpandFake>
          ))}
        </TransitionGroup>
        {(!!blocklist.length && !!blocklist[0].height) && (
          <DotSpinnerVar1 text="Loading blocks..."
            className="Chain-spinner" />
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    viewportType: state.ui.viewportType
  }),
  dispatch => ({
    unshiftBlocks(blocks) {
      dispatch(unshiftBlocks(blocks));
    }
  })
)(props => (
  <BlockchainContext.Consumer>
    {({ blockchainManager }) => (
      <Chain {...props} blockchainManager={blockchainManager} />
    )}
  </BlockchainContext.Consumer>
)));

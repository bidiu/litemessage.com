import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import BlockchainContext from '../../blockchain-context';
import Block from '../block/Block';
import Litemessages from '../litemessages/Litemessages';
import DotSpinnerVar1 from '../../common/ui/dot-spinner-var1/DotSpinnerVar1';

import './BlockDetails.css';

class BlockDetails extends Component {
  componentDidMount() {
    let { blockchainManager, blockId, blocks } = this.props;
    let block = blocks[blockId];

    if (!block.litemsgs) {
      blockchainManager.fetchBlockBody(blockId);
    }
  }

  render() {
    let { blockId, blocks } = this.props;
    // Because of animation, somehow when unmounting, 
    // `blockId` prop here could be undefined.
    // TODO I will investigate this further when I have time
    if (!blockId) { return null; }

    // get the block from store
    let block = blocks[blockId];

    return (
      <div className="BlockDetails">
        <Block block={block} />
        {block.litemsgs ? (
          <Litemessages litemsgs={block.litemsgs} />
        ) : (
          <DotSpinnerVar1 text="Loading block body..." />
        )}
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    blocks: state.blockchain.blocks,
  }),
  dispatch => ({})
)(props => (
  <BlockchainContext.Consumer>
    {({ blockchainManager }) => (
      <BlockDetails {...props}
        blockchainManager={blockchainManager} />
    )}
  </BlockchainContext.Consumer>
)));

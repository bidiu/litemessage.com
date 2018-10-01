import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import FullscreenViewer from '../../common/ui/fullscreen-viewer/FullscreenViewer';
import Block from '../block/Block';
import BlockDetails from '../block-details/BlockDetails';

import './Chain.css';

class Chain extends Component {
  constructor(props) {
    super(props);

    // `block` here is the block that is displayed in popup
    this.state = { block: null };
  }

  handleBlockClick = (block) => {
    this.setState({ block });
  }

  handleFullscreenViewerClose = () => {
    this.setState({ block: null });
  }

  render() {
    let { blocklist, viewportType } = this.props;
    let { block } = this.state;

    return (
      <div className="Chain">
        <FullscreenViewer open={!!block} showCloseBtn={viewportType === 'VIEWPORT_MOBILE'}
          onOpenChange={this.handleFullscreenViewerClose}>
          <BlockDetails blockId={block ? block.hash : undefined} />
        </FullscreenViewer>
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

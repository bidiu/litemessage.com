import React, { Component } from 'react';
import { hideDocScrollBars, showDocScrollBars } from '../../../utils/domUtils';
import Fade from '../fade/Fade';

import './FullscreenViewer.css';

class FullscreenViewer extends Component {
  constructor(props) {
    super(props);
    this.overlayClickHandler = this.overlayClickHandler.bind(this);
    this.overlayContentClickHandler = this.overlayContentClickHandler.bind(this);
    this.overlayCloseBtnHandler = this.overlayCloseBtnHandler.bind(this);
  }

  componentWillReceiveProps({ open: nextOpen }) {
    if (nextOpen) {
      hideDocScrollBars();
    } else {
      showDocScrollBars();
    }
  }
  
  overlayClickHandler(e) {
    // tell parent component that this should be closed
    this.props.onOpenChange(false);
  }

  overlayContentClickHandler(e) {
    // prevent clicking on content from closing the viewer
    e.stopPropagation();
  }

  overlayCloseBtnHandler(e) {
    // tell parent component to close this
    this.props.onOpenChange(false);
  }

  render() {
    let open = this.props.open;
    let showCloseBtn = this.props.showCloseBtn || true;

    return (
      <div className="FullscreenViewer">
        <div className={`FullscreenViewer-overlay ${open ? 'FullscreenViewer-overlay-open' : ''}`}
          onClick={this.overlayClickHandler}>
          {/* the content */}
          <Fade in={open} classNames="FullscreenViewer-Fade" timeout={500}>
            <div className="FullscreenViewer-overlay-content"
              onClick={this.overlayContentClickHandler}>
              {this.props.children}
            </div>
          </Fade>
          {/* the close button */}
          {(open && showCloseBtn) && (
            <i className="FullscreenViewer-overlay-close material-icons md-24 text-color-var3 ink-link-var1"
              onClick={this.overlayCloseBtnHandler}>
              close
            </i>
          )}
        </div>
        {/* the background's dark color shade */}
        <Fade in={open} classNames="FullscreenViewer-Fade-shade" timeout={500}>
          <div className="FullscreenViewer-overlay-shade"></div>
        </Fade>
      </div>
    );
  }
}

export default FullscreenViewer;

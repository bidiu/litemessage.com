import React, { Component } from 'react';

import './Github.css';

class Github extends Component {
  render() {
    return (
      <div className="Github">
        <h1 className="gh-head">Github Repos</h1>
        <div className="gh-body">
          {/* the first repo */}
          <div className="gh-section">
            <div className="gh-title">
              <a href="https://github.com/bidiu/litemessage.com"
                target="_blank" rel="noopener noreferrer"
                className="ink-link-var3">
                <i className="fab fa-github repo-icon"></i>bidiu/litemessage.com
              </a>
            </div>
            <div className="gh-abstract font-small">
              This repo is the website you are seeing right now, the offical client of litemessage, by which you can view blocks/litemessages inside the P2P network in realtime. You can also publish your own messages to the network.
            </div>
          </div>

          {/* the second repo */}
          <div className="gh-section">
            <div className="gh-title">
              <a href="https://github.com/bidiu/litemessage"
                target="_blank" rel="noopener noreferrer"
                className="ink-link-var3">
                <i className="fab fa-github repo-icon"></i>bidiu/litemessage
              </a>
            </div>
            <div className="gh-abstract font-small">
              This repo hosts the official implementation of litemessage protocol/clients, which is also used by litemessage.com. Besides, you can also use this repo to start your own node joining the P2P network. When used as a node, it supports two modes - full and thin modes.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Github;

import React, { Component } from 'react';

import './Geek.css';

class Geek extends Component {
  render() {
    return (
      <div className="Geek">
        <h1 className="gk-head">For Geeks</h1>
        <div className="gk-body">
          {/* to see console logs */}
          <div className="gk-section">
            <div className="gk-title">To view litenode logs:</div>
            <div className="gk-dir font-tiny">
              <span className="console-print-var2">Chrome</span>{' '}&gt;{' '}
              <span className="console-print-var2">DevTool</span>{' '}&gt;{' '}
              <span className="console-print-var2">Console</span>
            </div>
          </div>

          {/* to see network traffics */}
          <div className="gk-section">
            <div className="gk-title">To view WebSocket traffic:</div>
            <div className="gk-dir font-tiny">
              <span className="console-print-var2">Chrome</span>{' '}&gt;{' '}
              <span className="console-print-var2">DevTool</span>{' '}&gt;{' '}
              <span className="console-print-var2">Network</span>{' '}&gt;{' '}
              <span className="console-print-var2">{'{IP_Address}'}</span>{' '}&gt;{' '}
              <span className="console-print-var2">Frames</span>
            </div>
          </div>

          {/* to see database */}
          <div className="gk-section">
            <div className="gk-title">To view IndexedDB storage:</div>
            <div className="gk-dir font-tiny">
              <span className="console-print-var2">Chrome</span>{' '}&gt;{' '}
              <span className="console-print-var2">DevTool</span>{' '}&gt;{' '}
              <span className="console-print-var2">Application</span>{' '}&gt;{' '}
              <span className="console-print-var2">Storage</span>{' '}&gt;{' '}
              <span className="console-print-var2">IndexedDB</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Geek;

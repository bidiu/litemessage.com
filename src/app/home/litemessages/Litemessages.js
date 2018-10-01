import React, { Component, Fragment } from 'react';
import Litemessage from '../litemessage/Litemessage';
import LineDelimiter from '../../common/ui/line-delimiter/LineDelimiter';

import './Litemessages.css';

const EmptyEntry = () => <div style={{ height: 157 }}></div>;

class Litemessages extends Component {
  render() {
    let { litemsgs } = this.props;
    let total = litemsgs.length;
    let emptyEntries = Array(Math.max(0, 3 - total)).fill(undefined);

    return (
      <div className="Litemessages">
        <div className="Litemessages-list">
          {litemsgs.map((litemsg, index) => (
            <Fragment key={litemsg.hash}>
              <Litemessage 
                litemsg={litemsg}
                index={index}
                total={total} />
              <LineDelimiter />
            </Fragment>
          ))}
          {emptyEntries.map((_, index) => (
            <Fragment key={index}>
              <EmptyEntry />
              <LineDelimiter />
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Litemessages;

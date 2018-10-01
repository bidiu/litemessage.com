import React from 'react';

import './Block.css';

const Block = ({ block, onClick }) => {
  let title = block.height === 0 ? `BLOCK GENESIS` : `BLOCK #${block.height}`;
  let utc = new Date(block.time).toUTCString();

  return (
    <div className="Block font-tiny" id={block.hash}>
      <div onClick={() => onClick && onClick(block)}>
        <div className="info-row">
          <span className="info-name font-small text-truncate">BLOCK HASH</span>&nbsp;
          <span className="info-value console-print text-truncate" title={block.hash}>{block.hash}</span>
        </div>
        {block.prevBlock && (
          <div className="info-row">
            <span className="info-name font-small text-truncate">PREVIOUS BLOCK</span>&nbsp;
            <span className="info-value console-print-var1 text-truncate" title={block.prevBlock}>
              {block.prevBlock}
            </span>
          </div>
        )}
        <div className="info-row">
          <span className="info-name font-small text-truncate">MERKLE ROOT</span>&nbsp;
          <span className="info-value console-print-var1 text-truncate" title={block.merkleRoot}>
            {block.merkleRoot}
          </span>
        </div>
        <div className="info-row vp-mobile-show">
          <span className="info-name font-small text-truncate">MINED ON</span>&nbsp;
          <span className="info-value text-truncate">{utc}</span>
        </div>
        <div className="info-row">
          <span className="block-title font-big">{title}</span>&nbsp;
          <span className="vp-mobile-hide">on {utc}</span>
        </div>
        <span className="block-nonce console-print-var2 text-truncate" title="Nonce">
          {block.nonce}
        </span>
      </div>
    </div>
  );
}

export default Block;

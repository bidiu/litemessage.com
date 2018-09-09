import React from 'react';
import Block from '../block/Block';

import './Chain.css';

const Chain = ({ blocklist }) => (
  <div className="Chain">
    {[...blocklist].reverse().map(block => (
      <Block key={block.hash} block={block} />
    ))}
  </div>
);

export default Chain;

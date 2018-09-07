import React from 'react';

import './Block.css';

const Block = ({ block }) => (
  <div className="Block">{block.hash}</div>
);

export default Block;

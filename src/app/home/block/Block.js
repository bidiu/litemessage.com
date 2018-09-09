import React from 'react';

import './Block.css';

const Block = ({ block }) => (
  <div className="Block" data-aos="zoom-out-down">
    {block.hash}
  </div>
);

export default Block;

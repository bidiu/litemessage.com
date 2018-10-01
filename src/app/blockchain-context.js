import React from 'react';

/**
 * blockchain context for getting blockchain related
 * stuff. There aren't too many stuff you can get
 * with this context - most of them are in redux
 * store. 
 * 
 * Once thing you can get from this context is
 * blockchain manager.
 */
const BlockchainContext = React.createContext({});

export default BlockchainContext;

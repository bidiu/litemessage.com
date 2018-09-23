import { equalArrays } from './commonUtils';

/**
 * Changes in order won't make this function return true.
 */
const peersChanged = (oldPeers, newPeers, extractScalar = p => p.uuid) => {
  return !equalArrays(oldPeers, newPeers, extractScalar);
};

export { peersChanged };

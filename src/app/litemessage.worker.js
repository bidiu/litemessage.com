/*
 * Later when ready, this worker will be published with its own library.
 */

import { ThinNode } from 'litemessage/dist/litemessage.umd';

export function createNode(scope, initPeerUrls) {
  if (self.node) {
    throw new Error('Node was already created.');
  }

  self.node = new ThinNode(scope, { initPeerUrls });
  self.blockchain = node.protocol.blockchain;
};

export function getBlocks() {
  return self.blockchain.getBlocks();
}

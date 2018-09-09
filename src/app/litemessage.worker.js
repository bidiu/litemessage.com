/*
 * Later when ready, this worker will be published as its own library.
 */

import { ThinNode } from 'litemessage/dist/litemessage.umd';

export function createNode(scope, initPeerUrls) {
  if (self.node) {
    throw new Error('Node was already created.');
  }

  self.node = new ThinNode(scope, { initPeerUrls });
  self.blockchain = node.protocol.blockchain;

  self.node.on('ready', () => self.postMessage({ type: 'ready' }));

  self.blockchain.on('push', (block, prevHead) => 
    self.postMessage({ type: 'push', block, prevHead }));

  self.blockchain.on('switch', (blocks, prevHead) =>
    self.postMessage({ type: 'switch', blocks, prevHead }));
};

export function getBlocks() {
  return self.blockchain.getBlocks();
}

export function getHeadBlockId() {
  return self.blockchain.getHeadBlockIdSync();
}

export function getSubBlockchain(until, length) {
  return self.blockchain.getSubBlockchain(until, length);
}

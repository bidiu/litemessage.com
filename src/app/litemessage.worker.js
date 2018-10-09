/*
 * Later when ready, this worker will be published as its own library.
 * 
 * This worker is like a wrapper around thinnode running in WebWorker, 
 * which make it even easier for users to use the thinnode client.
 */

import { ThinNode } from 'litemessage/dist/litemessage.umd';
import { pickItems } from './utils/commonUtils';

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

  self.blockchain.on('update', (block, head) => 
    self.postMessage({ type: 'update', block, head }));

  self.node.on('locators', locators => 
    self.postMessage({ type: 'locators', locators }));
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

export function getPeers(nodeTypes = '*') {
  return self.node.peers(nodeTypes)
    .map(peer => peer.toJSON());
}

export function fetchBlockBody(blockId) {
  self.node.fetchBlockBody(blockId);
}

/**
 * Broadcast any liteprotocol msg.
 * 
 * Resolve `false` if the node cannot broadcast the msg, for instance, 
 * because there's no peer currently. Otherwise, resolve `true` indicating
 * operation is a success.
 * 
 * TODO support exclude option.
 */
export function broadcastMsg(msg, { nodeTypes = '*', limit = Number.MAX_SAFE_INTEGER } = {}) {
  let peers = pickItems(self.node.peers(nodeTypes), limit);

  if (peers.length) {
    peers.forEach(peer => peer.sendJson(msg));
    return true;
  }
  return false;
}

export function locateLitemsgs(litemsgs) {
  self.node.locateLitemsgs(litemsgs);
}

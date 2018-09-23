import { combineReducers } from 'redux';
import { genActionCreator, genActionTypeCreator } from '../../../utils/stateUtils';

import blocks from './blocks';
import chain from './chain';
import head from './head';
import peers from './peers';

const genActionType = genActionTypeCreator('blockchain');

const PUSH_BLOCKS = genActionType('push_blocks');
const UNSHIFT_BLOCKS = genActionType('unshift_blocks');
const SWITCH_BRANCH = genActionType('switch_branch');
const SET_PEERS = genActionType('set_peers');

const pushBlocks = genActionCreator(PUSH_BLOCKS, 'blocks');
const unshiftBlocks = genActionCreator(UNSHIFT_BLOCKS, 'blocks');
const switchBranch = genActionCreator(SWITCH_BRANCH, 'blocks');
// `peers`'d better be sorted based on uuid
const setPeers = genActionCreator(SET_PEERS, 'peers');

const blockchain = combineReducers({ blocks, chain, head, peers });

export {
  pushBlocks, PUSH_BLOCKS,
  unshiftBlocks, UNSHIFT_BLOCKS,
  switchBranch, SWITCH_BRANCH,
  setPeers, SET_PEERS,
};

export default blockchain;

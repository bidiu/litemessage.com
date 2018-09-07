import { combineReducers } from 'redux';
import { genActionCreator, genActionTypeCreator } from '../../../utils/stateUtils';

import blocks from './blocks';
import chain from './chain';

const genActionType = genActionTypeCreator('blockchain');

const PUSH_BLOCKS = genActionType('push_blocks');
const UNSHIFT_BLOCKS = genActionType('unshift_blocks');
const SWITCH_BRANCH = genActionType('switch_branch');

const pushBlocks = genActionCreator(PUSH_BLOCKS, 'blocks');
const unshiftBlocks = genActionCreator(UNSHIFT_BLOCKS, 'blocks');
const switchBranch = genActionCreator(SWITCH_BRANCH, 'blocks');

const blockchain = combineReducers({ blocks, chain });

export {
  pushBlocks, PUSH_BLOCKS,
  unshiftBlocks, UNSHIFT_BLOCKS,
  switchBranch, SWITCH_BRANCH,
};

export default blockchain;

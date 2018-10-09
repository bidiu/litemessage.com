import { combineReducers } from 'redux';
import { genActionCreator, genActionTypeCreator } from '../../../utils/stateUtils';
import pendingQueue from './pending-queue';

const genActionType = genActionTypeCreator('litemsgs');

// pending queue related
const SET_MSG = genActionType('pending_queue/set_msg');
const SEND_MSG = genActionType('pending_queue/send_msg');
const RESET_MSG = genActionType('pending_queue/reset_msg (sentAt & timeout)');
const TIMEOUT_MSG = genActionType('pending_queue/timeout_msg');
const SET_BLOCK_ID = genActionType('pending_queue/set_block_id');
const REMOVE_PENDING_MSG = genActionType('pending_queue/remove');

const setMsg = genActionCreator(SET_MSG, 'litemsg', 'nextPendingId');
const sendMsg = genActionCreator(SEND_MSG, 'pendingId', 'sentAt');
const resetMsg = genActionCreator(RESET_MSG, 'pendingId');
const timeoutMsg = genActionCreator(TIMEOUT_MSG, 'pendingId');
const setBlockId = genActionCreator(SET_BLOCK_ID, 'litemsgId', 'blockId');
const removePendingMsg = genActionCreator(REMOVE_PENDING_MSG, 'pendingId');

const litemsgs = combineReducers({ pendingQueue });

export default litemsgs;

export {
  setMsg, SET_MSG,
  sendMsg, SEND_MSG,
  resetMsg, RESET_MSG,
  timeoutMsg, TIMEOUT_MSG,
  setBlockId, SET_BLOCK_ID,
  removePendingMsg, REMOVE_PENDING_MSG,
};

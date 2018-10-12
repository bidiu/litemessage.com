import { combineEpics } from 'redux-observable';
import removePendingMsgEpic from './rm-pending-msg';

const rootEpic = combineEpics(
  removePendingMsgEpic
);

export default rootEpic;

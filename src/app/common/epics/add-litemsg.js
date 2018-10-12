import { addLitemsg, SET_BLOCK_ID } from '../state/litemsgs/index';

const addLitemsgEpic = (action$, store) =>
  action$.ofType(SET_BLOCK_ID)
    .map(({ litemsgId }) => {
      let pendingEntry = store.getState().litemsgs.pendingQueue
        .find(e => e.litemsg && e.litemsg.hash === litemsgId);

      return addLitemsg(pendingEntry.litemsg);
    });

export default addLitemsgEpic;

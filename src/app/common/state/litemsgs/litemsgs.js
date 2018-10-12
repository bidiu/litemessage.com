import { ADD_LITEMSG } from './index';

const litemsgs = (state = {}, { type, litemsg }) => {
  switch (type) {
    case ADD_LITEMSG:
      return { ...state, [litemsg.hash]: litemsg };

    default:
      return state;
  }
};

export default litemsgs;

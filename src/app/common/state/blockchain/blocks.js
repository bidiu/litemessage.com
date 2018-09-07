import {
  PUSH_BLOCKS, UNSHIFT_BLOCKS, SWITCH_BRANCH
} from './index';

const blocks = (state = {}, { type, blocks }) => {
  switch (type) {
    case PUSH_BLOCKS:
    case UNSHIFT_BLOCKS:
    case SWITCH_BRANCH:
      let nextState = { ...state };
      for (let block of blocks) {
        nextState[block.hash] = block;
      }
      return nextState;

    default:
      return state;
  }
};

export default blocks;

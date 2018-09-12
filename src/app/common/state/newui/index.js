import { combineReducers } from 'redux';
import { genActionCreator, genActionTypeCreator } from '../../../utils/stateUtils';
import tab from './tab';

const genActionType = genActionTypeCreator('new_ui');

const SET_TAB = genActionType('set_tab');
const UNSET_TAB = genActionType('unset_tab');

const setTab = genActionCreator(SET_TAB, 'tab');
const unsetTab = genActionCreator(UNSET_TAB);

const newui = combineReducers({ tab });

export {
  setTab, SET_TAB,
  unsetTab, UNSET_TAB,
};

export default newui;

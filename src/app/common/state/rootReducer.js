import { combineReducers } from 'redux';
import overall from './overall/reducer';
import ui from './ui/reducer';
import notifications from './notifications/reducer';
import blockchain from './blockchain/index';

const rootReducer = combineReducers({ overall, ui, notifications, blockchain });

export default rootReducer;

import { combineReducers } from 'redux';
import overall from './overall/reducer';
import notifications from './notifications/reducer';
import ui from './ui/reducer';

const rootReducer = combineReducers({ overall, notifications, ui });

export default rootReducer;

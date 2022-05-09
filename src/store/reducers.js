import { combineReducers } from 'redux';
import Layout from './layout/reducer';
import AdminReducer from './admin/reducer';

const rootReducer = combineReducers({
  Layout,
  Admin: AdminReducer,
});

export default rootReducer;

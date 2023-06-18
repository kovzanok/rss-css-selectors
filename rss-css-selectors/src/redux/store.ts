import { legacy_createStore as createStore, combineReducers } from 'redux';
import { levelReducer, progressReducer } from './reducers';

const rootReducer = combineReducers({
  level: levelReducer,
  progress: progressReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;

export default store;

import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import IncrementCount from './reducers/counter.js';

const rootReducer = combineReducers({ IncrementCount });

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

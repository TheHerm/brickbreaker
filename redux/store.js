import { combineReducers, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { count } from './reducers/counter.js';

const rootReducer = combineReducers({ count });

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from './modules/auth';
import logger from 'redux-logger';

const reducer = combineReducers({ auth });

const middleware = [logger];

export const store = configureStore({
  reducer,
  middleware,
  devTools: true,
});

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import user from './modules/user';
import { userSaga } from '../saga/userSaga';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({ user });

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

// 지금이 어느 환경인 지 알려줌 (개발환경, 프로덕션(배포)환경 ...)
const devMode = process.env.NODE_ENV === 'development';

// 개발자 환경에서만 로거 미들웨어 추가
if (devMode) {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

export function* rootSaga() {
  yield all([userSaga()]);
}

export const store = configureStore({
  reducer,
  devTools: devMode,
  middleware,
});
sagaMiddleware.run(rootSaga);

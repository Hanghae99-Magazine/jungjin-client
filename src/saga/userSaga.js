import * as userAPI from '../api/user';

import { put, call, takeLatest } from 'redux-saga/effects';
import { login, logout, checkLogin } from '../redux/modules/user';
import { deleteCookie, setCookie } from '../shared/cookie';

//saga

function* loginSaga(action) {
  try {
    const res = yield call(() => userAPI.login(action.payload));
    setCookie('mytoken', res.data.mytoken, 3);
    sessionStorage.setItem('nickname', res.data.nickname);
    yield put({ type: `${action.type}Success`, payload: res.data.nickname });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

function* logoutSaga(action) {
  try {
    deleteCookie('mytoken');
    sessionStorage.clear('nickname');
    yield put({ type: `${action.type}Success` });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

function* checkLoginSaga(action) {
  try {
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

// saga watcher

export function* userSaga() {
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(checkLogin, checkLoginSaga);
}

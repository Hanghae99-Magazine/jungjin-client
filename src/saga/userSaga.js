import * as userAPI from '../api/user';

import { put, call, takeLatest } from 'redux-saga/effects';
import { login } from '../redux/modules/user';
import { setCookie } from '../shared/Cookie';

//saga

function* loginSaga(action) {
  try {
    const user = yield call(() => userAPI.login(action.payload));
    setCookie('myToken', 'sucess', 3);
    console.log(user);
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

// saga watcher

export function* userSaga() {
  yield takeLatest(login, loginSaga);
}

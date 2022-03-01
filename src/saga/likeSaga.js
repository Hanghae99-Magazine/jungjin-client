import * as likeAPI from '../api/like';

import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchLike } from '../redux/modules/like';

function* fetchLikeSaga(action) {
  try {
    const res = yield call(() => likeAPI.fetchLike(action.payload));
    yield put({ type: `${action.type}Success`, payload: res.data });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

export function* likeSaga() {
  yield takeLatest(fetchLike, fetchLikeSaga);
}

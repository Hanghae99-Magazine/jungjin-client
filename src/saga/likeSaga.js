import * as likeAPI from '../api/like';

import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchLike } from '../redux/modules/like';

//saga

function* fetchLikeSaga(action) {
  try {
    const res = yield call(() => likeAPI.fetchLike(action.payload));
    console.log(res);
    yield put({ type: `${action.type}Success`, payload: res.data.like_check });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

export function* likeSaga() {
  yield takeLatest(fetchLike, fetchLikeSaga);
}

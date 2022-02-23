import * as postsAPI from '../api/posts';

import { put, call, takeLatest, delay } from 'redux-saga/effects';
import { getPosts } from '../redux/modules/posts';

function* getPostsSaga(action) {
  try {
    const postsData = yield call(() => postsAPI.getPosts());
    yield put({ type: `${action.type}Success`, payload: postsData.data });
  } catch (e) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

export function* postsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
}

import * as postsAPI from '../api/posts';

import { put, call, takeLatest } from 'redux-saga/effects';
import { addPost, getPosts } from '../redux/modules/posts';

function* getPostsSaga(action) {
  try {
    const postsData = yield call(() => postsAPI.getPosts());
    yield put({ type: `${action.type}Success`, payload: postsData.data.posts });
  } catch (e) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

function* addPostSaga(action) {
  try {
    yield call(() => postsAPI.addPost(action.payload));
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (e) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

export function* postsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeLatest(addPost, addPostSaga);
}

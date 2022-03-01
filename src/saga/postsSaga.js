import * as postsAPI from '../api/posts';
import * as s3ImgAPI from '../api/s3Image';

import { put, call, takeLatest } from 'redux-saga/effects';
import {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../redux/modules/posts';

import { v4 as uuidv4 } from 'uuid';

function* getPostsSaga(action) {
  try {
    const postsData = yield call(() => postsAPI.getPosts());
    yield put({ type: `${action.type}Success`, payload: postsData.data.posts });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

function* addPostSaga(action) {
  const nickname = sessionStorage.getItem('nickname');
  const s3Url = process.env.REACT_APP_IMAGE_URL;
  const file = action.payload.file;
  const fileName = `${nickname}_${uuidv4()}.${
    action.payload.file.type.split('/')[1]
  }`;
  try {
    yield call(() => s3ImgAPI.putS3Img(file, fileName));
    action.payload.post_img = `${s3Url + '/upload/' + fileName}`;
    yield call(() => postsAPI.addPost(action.payload));
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

function* getPostByIdSaga(action) {
  try {
    const postData = yield call(() => postsAPI.getPostById(action.payload));
    yield put({ type: `${action.type}Success`, payload: postData });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

function* updatePostSaga(action) {
  const file = action.payload.file;
  const fileName = action.payload.fileName;

  try {
    yield call(() => s3ImgAPI.putS3Img(file, fileName));
    yield call(() => postsAPI.updatePost(action.payload.post));
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}

function* deletePostSaga(action) {
  const fileName = action.payload.fileName;

  try {
    yield call(() => s3ImgAPI.deleteS3Img(fileName));
    // yield call(() => s3ImgDelete(action.payload.file));
    yield call(() => postsAPI.deletePost(action.payload.post_id));
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (err) {
    yield put({ type: `${action.type}Failure`, payload: err });
  }
}
export function* postsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
  yield takeLatest(addPost, addPostSaga);
  yield takeLatest(getPostById, getPostByIdSaga);
  yield takeLatest(updatePost, updatePostSaga);
  yield takeLatest(deletePost, deletePostSaga);
}

import { put, takeLatest } from 'redux-saga/effects';
import { uploadImg } from '../redux/modules/image';

function* uploadImageSaga(action) {
  try {
    yield put({ type: `${action.type}Success`, payload: action.payload });
  } catch (e) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

export function* imageSaga() {
  yield takeLatest(uploadImg, uploadImageSaga);
}

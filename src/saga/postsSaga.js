import * as postsAPI from '../api/posts';

import { put, call, takeLatest } from 'redux-saga/effects';
import { addPost, getPosts } from '../redux/modules/posts';

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// AWS S3 연결을 위한 변수 할당
const S3_BUCKET = 'jungjinmagazine';
const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
const REGION = 'ap-northeast-2';

// AWS config 설정
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

// AWS S3 버킷 정보 설정
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
function* getPostsSaga(action) {
  try {
    const postsData = yield call(() => postsAPI.getPosts());
    yield put({ type: `${action.type}Success`, payload: postsData.data.posts });
  } catch (e) {
    yield put({ type: `${action.type}Failure`, payload: action.payload });
  }
}

function* addPostSaga(action) {
  const nickname = sessionStorage.getItem('nickname');
  const s3Url = process.env.REACT_APP_IMAGE_URL;
  const fileName = `${nickname}_${uuidv4()}.${
    action.payload.file.type.split('/')[1]
  }`;

  const s3ImgUpload = (file) => {
    console.log(file);
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'upload/' + fileName,
      ContentType: file.type,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt, res) => {})
      .send((err, data) => {
        if (err) {
          console.error(err);
        }
      });
  };
  try {
    yield call(() => s3ImgUpload(action.payload.file));
    action.payload.post_img = `${s3Url + '/upload/' + fileName}`;
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

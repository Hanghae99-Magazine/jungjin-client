import AWS from 'aws-sdk';

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

export const putS3Img = (file, fileName) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: 'upload/' + fileName,
    ContentType: file.type,
  };

  myBucket
    .putObject(params)
    .on('httpUploadProgress', (evt, res) => {
      return res;
    })
    .send((err, data) => {
      if (err) {
        return err.response;
      }
    });
};

export const deleteS3Img = (fileName) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: 'upload/' + fileName,
  };

  myBucket
    .deleteObject(params)
    .on('httpUploadProgress', (evt, res) => {})
    .send((err, data) => {
      if (err) {
        return err.response;
      }
    });
};

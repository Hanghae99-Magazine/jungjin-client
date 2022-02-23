import React from 'react';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';

import { useState } from 'react';
import CommonHeader from '../components/common/CommonHeader';

import AWS from 'aws-sdk';

const WritePage = () => {
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');

  const S3_BUCKET = 'jungjinmagazine';
  const ACCESS_KEY = process.env.REACT_APP_S3_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;
  const REGION = 'ap-northeast-2';

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setProgress(0);
    setSelectedFile(file);
    encodeFileToBase64(file);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: 'upload/' + file.name,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt, res) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setTimeout(() => {
          setSelectedFile(null);
          console.log(res?.request?.httpRequest?.path);
          console.log('성공');
        }, 3000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onChnage = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <CommonHeader />
      <CommonTemplate>
        <h2>작성하기</h2>
        <WriteWrapper>
          <div className="upload-btn">
            <label htmlFor="inputFile">업로드</label>
            <input id="inputFile" type="file" onChange={handleFileInput} />
          </div>
          <div className="img-box">
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </div>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            onChange={onChnage}
          ></textarea>
          <button
            id="writeBtn"
            className="write-btn"
            type="submit"
            onClick={() => {
              uploadFile(selectedFile);
            }}
          >
            작성하기
          </button>
        </WriteWrapper>
      </CommonTemplate>
    </>
  );
};

const WriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 2rem;
  margin: 3rem;
  .upload-btn {
    label {
      display: inline-block;
      padding: 0.5em 0.75em;
      color: #fff;
      font-size: inherit;
      line-height: normal;
      vertical-align: middle;
      background-color: #000;
      cursor: pointer;
      border-radius: 5px;
      border-radius: 0.25em;
    }
    input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    border: 1px solid #000;
    img {
      width: 100%;
    }
  }
  textarea {
    resize: none;
  }
  .write-btn {
    width: 30%;
    margin: 20px 30px;
    padding: 15px 10px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 1.6rem;
  }
`;

export default WritePage;

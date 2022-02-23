import React, { useState } from 'react';
import styled from 'styled-components';
import DefaultLayout from './DefaultLayout';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';

import AWS from 'aws-sdk';
import axios from 'axios';
import { useSelector } from 'react-redux';

const WriteForm = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(process.env.REACT_APP_IMAGE_URL);

  const [Layout, setLayout] = useState('');

  const changeLayout = (e) => {
    setLayout(e.target.value);
  };

  const nickname = useSelector(({ user }) => {
    console.log(user);
  });

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

  // input type file 관리
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // const fileExt = file.name.split('.').pop().toLowerCase();
    console.log(file);
    // 파일형식 예외처리
    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
      alert('jpg, png 파일만 Upload 가능합니다.');
      return;
    }
    // 파일크기 예외처리

    if (file.szie > 30000000) {
      alert('3MB 이하만 업로드 가능');
      return;
    }

    // setProgress(0);
    setSelectedFile(file);
    encodeFileToBase64(file);
  };

  // 미리보기 이미지를 위해 인코딩 함수 구현
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

  // S3 에 업로드 함수 구현
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
        const imgPath = res?.request?.httpRequest?.path;
        setSelectedFile(null);
        setImgUrl(imgUrl + imgPath);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  // console.log(imgUrl);
  console.log(Layout);

  // const payload = {
  //   uerId :
  // }

  // const handleSubmit = async () => {
  //   await axios.post('http://localhost:4000/post', payload);
  // };
  return (
    <WriteFormWrapper>
      <div className="layout-box">
        <select id="imgPosition" onChange={changeLayout} value={Layout}>
          <option defaultChecked>📖 Layout</option>
          <option value="default">default</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>
      {Layout && (
        <div className="upload-btn">
          <label htmlFor="inputFile">이미지 업로드</label>
          <input id="inputFile" type="file" onChange={handleFileInput} />
        </div>
      )}
      {Layout === 'default' && <DefaultLayout />}
      {Layout === 'left' && <LeftLayout />}
      {Layout === 'right' && <RightLayout />}
      {Layout && (
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
      )}
    </WriteFormWrapper>
  );
};

const WriteFormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 2rem;
  margin: 3rem;
  .layout-box {
    select {
      font-size: 3rem;
      font-weight: bolder;
    }
  }
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
    padding: 15px 10px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    font-size: 1.6rem;
  }
`;

export default WriteForm;

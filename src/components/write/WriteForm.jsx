import React, { useState } from 'react';
import styled from 'styled-components';

import AWS from 'aws-sdk';

import { useDispatch, useSelector } from 'react-redux';
import { uploadImg } from '../../redux/modules/image';
import useInputValue from '../../hooks/useInputValue';
import { addPost } from '../../redux/modules/posts';

const WriteForm = () => {
  const dispatch = useDispatch();

  const [imageSrc, setImageSrc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [Layout, setLayout] = useState('');
  const postContent = useInputValue('');

  const changeLayout = (e) => {
    setLayout(e.target.value);
  };

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
    const imgUrl = process.env.REACT_APP_IMAGE_URL;
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
    // console.log(imgUrl + 'upload/' + file.name);
    dispatch(uploadImg(imgUrl + 'upload/' + file.name));

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

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  const ImgUrl = useSelector(({ image }) => {
    return image.imgUrl;
  });

  const handleSubmit = () => {
    uploadFile(selectedFile);
    if (!Layout) {
      alert('Layout을 선택해주세요');
      return;
    }

    if (!postContent.value) {
      alert('내용을 적어주세요');
      return;
    }

    const payload = {
      img_position: Layout,
      post_img: ImgUrl,
      post_content: postContent.value,
    };

    // await addPost(payload);

    dispatch(addPost(payload));
  };

  return (
    <>
      <WriteFormWrapper onSubmit={handleSubmit}>
        <div className="layout-box">
          <select id="imgPosition" onChange={changeLayout} value={Layout}>
            <option defaultChecked>📖 Layout</option>
            <option value="default">default</option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </div>
        <div className="upload-btn">
          <label htmlFor="inputFile">이미지 업로드</label>
          <input id="inputFile" type="file" onChange={handleFileInput} />
        </div>
        <div className="post-info">
          <div className="post-info">
            <textarea
              className="post-content"
              placeholder="내용을 적어주세요"
              onChange={postContent.onChange}
            ></textarea>
          </div>
          <div className="post-img-box">
            <img
              src={
                imageSrc
                  ? imageSrc
                  : 'https://via.placeholder.com/300x200/000000/FFFFFF/?text=upload image'
              }
              alt="postImg"
              className="post-img"
            />
          </div>
        </div>
        <button id="writeBtn" className="write-btn" type="submit">
          작성하기
        </button>
      </WriteFormWrapper>
    </>
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
  .post-info {
    width: 70%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 1.4rem;
    .post-img-box {
      width: 100%;
      .post-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .post-info {
      width: 100%;
      border: 2px solid #000;
      .post-content {
        width: 100%;
        height: 100%;
        padding: 2rem;
        font-size: 2rem;
        font-weight: bolder;
        resize: none;
        border: none;
      }
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

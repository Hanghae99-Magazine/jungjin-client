import React from 'react';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';

import { useState } from 'react';
// import AWS from 'aws-sdk';

const WritePage = () => {
  const [imageSrc, setImageSrc] = useState('');

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

  const changeImg = (e) => {
    console.log(e.target);
    encodeFileToBase64(e.target.files[0]);
  };

  return (
    <CommonTemplate>
      <h2>작성하기</h2>
      <WriteWrapper>
        <input type="file" onChange={changeImg} value="" />
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
        <button id="writeBtn" className="write-btn" type="submit">
          작성하기
        </button>
      </WriteWrapper>
    </CommonTemplate>
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
  img {
    width: 50%;
  }
  .write-btn {
    width: 300px;
    margin: 20px 30px;
    padding: 15px 10px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 1.6rem;
  }
`;

export default WritePage;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import useInputValue from '../../hooks/useInputValue';
import { getPostById, getPosts, updatePost } from '../../redux/modules/posts';

import { useNavigate, useParams } from 'react-router-dom';

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { id: post_id } = params;

  const postData = useSelector(({ posts }) => {
    return posts.post;
  });
  useEffect(() => {
    dispatch(getPostById(post_id));
  }, [dispatch]);
  const [imageSrc, setImageSrc] = useState(postData.imgUrl);
  const [selectedFile, setSelectedFile] = useState(null);
  const [Layout, setLayout] = useState(postData.imgPosition);
  const { value: postContent, onChange } = useInputValue(postData.content);

  const changeLayout = (e) => {
    setLayout(e.target.value);
  };

  // input type file 관리
  const handleFileInput = (e) => {
    const file = e.target.files[0];

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Layout) {
      alert('Layout을 선택해주세요');
      return;
    }

    if (!selectedFile) {
      alert('이미지를 다시 선택해주세요');
      return;
    }

    if (!postContent) {
      alert('내용을 적어주세요');
      return;
    }

    const payload = {
      file: selectedFile,
      fileName: postData.imgUrl.split('/')[4],
      post: {
        post_id,
        post_img: postData.imgUrl,
        post_content: postContent,
        img_position: Layout,
      },
    };
    // console.log(payload);
    dispatch(updatePost(payload));
    dispatch(getPosts());
    setTimeout(() => {
      navigate('/');
    }, 200);
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
              onChange={onChange}
              value={postContent}
            ></textarea>
          </div>
          <div className="post-img-box">
            <img src={imageSrc} alt="postImg" className="post-img" />
          </div>
        </div>
        <button id="writeBtn" className="write-btn" type="submit">
          수정하기
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

export default AddForm;

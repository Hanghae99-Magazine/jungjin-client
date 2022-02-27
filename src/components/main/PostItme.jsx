import React from 'react';
import styled from 'styled-components';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdCreate } from 'react-icons/io';
import { deletePost } from '../../api/posts';
import { useNavigate } from 'react-router-dom';

const PostItme = ({ postData }) => {
  console.log(postData);
  const navigate = useNavigate();

  const nickname = sessionStorage.getItem('nickname');

  const handleUpdateBtn = () => {
    navigate(`/write/update/${postData.post_id}`);
  };

  const handleDeleteBtn = async () => {
    await deletePost(postData.post_id);
    navigate('/');
  };
  return (
    <PostItemWrapper>
      <div className="user-info-container">
        <div className="user-profile-info">
          <span>{postData.nickname}</span>
        </div>
        <div className="sub-info">
          <span>{postData.upload_date}</span>
        </div>
        {nickname === postData.nickname ? (
          <div className="update-container">
            <IoMdCreate className="update-btn" />
            <AiFillDelete className="delete-btn" onClick={handleDeleteBtn} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="post-info">
        <div className="post-img-container">
          <img src={postData.post_img} alt="postImg" className="post-img" />
        </div>
        <TestWrapper
          className="post-content"
          post_img={`url(${postData.post_img})`}
          // style={{ background: `url(${postData.post_img})` }}
        >
          {postData.post_content}
        </TestWrapper>
      </div>
      <div className="like">
        <div className="like-icon">좋아요</div>
        <span>좋아요 수 {postData.post_like}</span>
      </div>
    </PostItemWrapper>
  );
};

const PostItemWrapper = styled.li`
  width: 70%;
  padding: 0 1rem;
  margin: 2rem auto;
  box-shadow: 0px -1px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .user-info-container {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.6rem;
    font-weight: bolder;
    .delete-btn:hover {
      cursor: pointer;
      color: red;
    }
  }
  .update-container {
    font-size: 3rem;
    display: flex;
    gap: 1rem;
    .update-btn:hover {
      cursor: pointer;
      color: #eeeee2;
    }
    .delete-btn:hover {
      cursor: pointer;
      color: #ff0000;
    }
  }
  .like {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .post-img {
    width: 100%;
    object-fit: cover;
    margin-bottom: 1.2rem;
  }
  .post-info {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    .post-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .post-description {
      height: 3rem;
    }
  }

  /* .post-content {
    white-space: pre-line;
    width: 300px;
    height: 200px;
  } */

  .sub-info {
    padding: 0.5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
  }
`;

const TestWrapper = styled.div`
  width: 100%;
  background-image: ${(props) => props.post_img};
  background-size: cover;
  display: inline-block;
`;

export default PostItme;

import React from 'react';
import styled from 'styled-components';

const PostItme = () => {
  return (
    <PostItemWrapper>
      <div className="post-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/mango.jpeg`}
          alt="postImg"
          className="post-img"
        />
      </div>
      <div className="post-info">
        <p className="post-title">망고는 귀엽다</p>
        <p className="post-content">망고는 귀엽다</p>
      </div>
      <div className="user-info-container">
        <div className="user-profile-info">
          <span>닉네임 jungks</span>
        </div>
        <div className="like">
          <div className="like-icon">좋아요</div>
        </div>
      </div>
      <div className="sub-info">
        <span>몇시간 전 or 22-02-18</span>
        <span>댓글 수 100</span>
      </div>
    </PostItemWrapper>
  );
};

const PostItemWrapper = styled.li`
  width: 70%;
  padding: 0 1rem;
  margin: 2rem auto;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.4rem;
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
  .user-info-container {
    padding: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-profile-info {
      display: flex;
      align-items: center;
      .user-profile-img {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 0.5rem;
      }
    }
    .like {
      margin-left: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }
  .sub-info {
    padding: 0.5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
  }
`;

export default PostItme;

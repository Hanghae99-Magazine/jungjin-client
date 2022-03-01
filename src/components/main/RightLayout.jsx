import React from 'react';
import styled from 'styled-components';

const RightLayout = ({ postData }) => {
  return (
    <RightLayoutWrapper className="post-info">
      <div className="post-info">
        <div className="post-content">{postData.post_content}</div>
      </div>
      <div className="post-img-box">
        <img src={postData.post_img} alt="postImg" className="post-img" />
      </div>
    </RightLayoutWrapper>
  );
};

const RightLayoutWrapper = styled.div`
  padding: 0.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;

  .post-info {
    width: 30%;
    .post-content {
      width: 100%;
      height: 100%;
      white-space: pre-line;
    }
  }

  .post-img-box {
    width: 70%;
    .post-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export default RightLayout;

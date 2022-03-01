import React from 'react';
import styled from 'styled-components';

const LeftLayout = ({ postData }) => {
  return (
    <LeftLayoutWrapper className="post-info">
      <div className="post-info">
        <div className="post-content">{postData.post_content}</div>
      </div>
      <div className="post-img-box">
        <img src={postData.post_img} alt="postImg" className="post-img" />
      </div>
    </LeftLayoutWrapper>
  );
};

const LeftLayoutWrapper = styled.div`
  padding: 0.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
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
export default LeftLayout;

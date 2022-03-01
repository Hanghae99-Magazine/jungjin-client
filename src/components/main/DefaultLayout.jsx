import React from 'react';
import styled from 'styled-components';

const DefaultLayout = ({ postData }) => {
  return (
    <DefaultWrapper className="post-info">
      <div className="post-content">{postData.post_content}</div>
      <div className="post-img-box">
        <img src={postData.post_img} alt="postImg" className="post-img" />
      </div>
    </DefaultWrapper>
  );
};

const DefaultWrapper = styled.div`
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;

  .post-info {
    width: 100%;
    .post-content {
      width: 100%;
      height: 100%;
      white-space: pre-line;
    }
  }

  .post-img-box {
    width: 100%;
    .post-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export default DefaultLayout;

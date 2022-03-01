import React from 'react';
import styled from 'styled-components';

import PostHeader from './PostHeader';
import DefaultLayout from './DefaultLayout';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import PostFooter from './PostFooter';

const PostItem = ({ postData }) => {
  const headerProps = {
    post_id: postData.post_id,
    nickname: postData.nickname,
    post_img: postData.post_img,
  };

  const mainProps = {
    post_img: postData.post_img,
    post_content: postData.post_content,
    img_position: postData.img_position,
  };

  const footerProps = {
    upload_date: postData.upload_date,
    post_id: postData.post_id,
    post_like: postData.post_like,
    like_list: postData.like_list,
    nickname: postData.nickname,
  };

  return (
    <PostItemWrapper>
      <PostHeader postData={headerProps} />

      {postData.img_position === 'default' && (
        <DefaultLayout postData={mainProps} />
      )}
      {postData.img_position === 'left' && <LeftLayout postData={mainProps} />}
      {postData.img_position === 'right' && (
        <RightLayout postData={mainProps} />
      )}
      <PostFooter postData={footerProps} />
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
`;

export default PostItem;

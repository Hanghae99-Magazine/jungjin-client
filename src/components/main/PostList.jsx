import React from 'react';
import styled from 'styled-components';
import PostItme from './PostItme';

const PostList = () => {
  return (
    <PostListWrapper>
      <PostItme />
      <PostItme />
      <PostItme />
      <PostItme />
      <PostItme />
    </PostListWrapper>
  );
};

const PostListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
export default PostList;

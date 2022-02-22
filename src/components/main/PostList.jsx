import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPosts } from '../../redux/modules/posts';
import PostItme from './PostItme';

const PostList = () => {
  const dispatch = useDispatch();

  const postsList = useSelector(({ posts }) => {
    return posts.posts;
  });
  console.log(postsList);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <PostListWrapper>
      {postsList &&
        postsList.map((post, i) => <PostItme key={i} postData={post} />)}
    </PostListWrapper>
  );
};

const PostListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
export default PostList;

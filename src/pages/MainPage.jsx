import React from 'react';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';
import PostList from '../components/main/PostList';

const MainPage = () => {
  return (
    <CommonTemplate>
      <PostList />
    </CommonTemplate>
  );
};

export default MainPage;

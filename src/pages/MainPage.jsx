import React from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonTemplate from '../components/common/CommonTemplate';
import PostList from '../components/main/PostList';

const MainPage = () => {
  return (
    <>
      <CommonHeader />
      <CommonTemplate>
        <PostList />
      </CommonTemplate>
    </>
  );
};

export default MainPage;

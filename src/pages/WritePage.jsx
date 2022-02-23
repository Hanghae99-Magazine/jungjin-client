import React from 'react';

import CommonHeader from '../components/common/CommonHeader';
import CommonTemplate from '../components/common/CommonTemplate';
import WriteForm from '../components/writeLayout/WriteForm';

const WritePage = () => {
  return (
    <>
      <CommonHeader />
      <CommonTemplate>
        <WriteForm />
      </CommonTemplate>
    </>
  );
};

export default WritePage;

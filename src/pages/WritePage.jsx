import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonHeader from '../components/common/CommonHeader';
import CommonTemplate from '../components/common/CommonTemplate';
import WriteForm from '../components/write/WriteForm';
import { getCookie } from '../shared/Cookie';

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

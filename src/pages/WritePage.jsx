import React from 'react';
import { useParams } from 'react-router-dom';

import CommonHeader from '../components/common/CommonHeader';
import CommonTemplate from '../components/common/CommonTemplate';
import AddForm from '../components/write/AddForm';
import UpdateForm from '../components/write/UpdateForm';

const WritePage = () => {
  const params = useParams();
  const { type } = params;
  return (
    <>
      <CommonHeader />
      <CommonTemplate>
        {type === 'add' ? <AddForm /> : <UpdateForm />}
      </CommonTemplate>
    </>
  );
};

export default WritePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';
import useInputValue from '../hooks/useInputValue';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/Cookie';
import CommonHeader from '../components/common/CommonHeader';
import RegistForm from '../components/regist/RegistForm';

const RegistPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  useEffect(() => {
    //token
    let myToken = getCookie('mytoken');
    myToken ? setToken(true) : setToken(false);
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);
  return (
    <>
      <CommonHeader />
      <CommonTemplate>
        <h2>회원가입</h2>
        <RegistForm />
      </CommonTemplate>
    </>
  );
};

export default RegistPage;

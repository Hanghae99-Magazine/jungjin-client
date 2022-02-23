import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTemplate from '../components/common/CommonTemplate';
import { getCookie } from '../shared/Cookie';
import CommonHeader from '../components/common/CommonHeader';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  const [token, setToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
        <h2>로그인</h2>
        <LoginForm />
      </CommonTemplate>
    </>
  );
};

export default LoginPage;

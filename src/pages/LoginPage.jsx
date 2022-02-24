import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTemplate from '../components/common/CommonTemplate';
import CommonHeader from '../components/common/CommonHeader';
import LoginForm from '../components/login/LoginForm';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();

  const isLogin = useSelector(({ user }) => {
    return user.isLogin;
  });

  useEffect(() => {
    if (isLogin) {
      alert('이미 로그인 하셨습니다.');
      navigate('/');
    }
  }, [isLogin, navigate]);
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

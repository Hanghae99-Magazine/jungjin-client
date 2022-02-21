import React from 'react';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';

const LoginPage = () => {
  return (
    <CommonTemplate>
      <h2>로그인</h2>
      <LoginForm>
        <input id="userId" type="id" placeholder="아이디" />
        <input id="password" type="password" placeholder="비밀번호" />
        <button id="registBtn" className="login-btn">
          로그인
        </button>
      </LoginForm>
    </CommonTemplate>
  );
};

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 2rem;
  margin: 3rem;
  input {
    width: 300px;
    display: block;
    border: 1px solid #000;
    margin: 20px 30px 0px;
    color: #fff;
    padding: 15px 10px;
    border-radius: 5px;
    font-size: 1.6rem;
  }
  input::placeholder {
    font-size: 1.6rem;
    color: #8c8c8c;
  }
  .login-btn {
    width: 300px;
    margin: 20px 30px;
    padding: 15px 10px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 1.6rem;
  }
`;

export default LoginPage;

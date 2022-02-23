import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useInputValue from '../../hooks/useInputValue';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useInputValue('');
  const userPw = useInputValue('');

  const loginUser = async (e) => {
    e.preventDefault();

    const user = {
      user_id: userId.value,
      user_pw: userPw.value,
    };

    const res = await axios.post('http://3.36.75.239/login', user);
    console.log(res);
    // dispatch(login(user));

    // navigate(-1);
  };
  return (
    <LoginFormWrapper onSubmit={loginUser}>
      <input
        id="userId"
        type="id"
        placeholder="아이디"
        autoComplete="off"
        onChange={userId.onChange}
      />
      <input
        id="password"
        type="password"
        placeholder="비밀번호"
        autoComplete="off"
        onChange={userPw.onChange}
      />
      <button id="loginBtn" className="login-btn" type="submit">
        로그인
      </button>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.form`
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
    color: #000;
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

export default LoginForm;

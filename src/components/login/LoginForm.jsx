import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useInputValue from '../../hooks/useInputValue';
import { login } from '../../redux/modules/user';
import CommonInput from '../common/CommonInput';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useInputValue('');
  const userPw = useInputValue('');

  const loginUser = (e) => {
    e.preventDefault();

    const user = {
      user_id: userId.value,
      user_pw: userPw.value,
    };

    dispatch(login(user));

    navigate('/');
  };
  return (
    <LoginFormWrapper onSubmit={loginUser}>
      <CommonInput
        id="userId"
        type="id"
        placeholder="아이디"
        onChange={userId.onChange}
      />
      <CommonInput
        id="password"
        type="password"
        placeholder="비밀번호"
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

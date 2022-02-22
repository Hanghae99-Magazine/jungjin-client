import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';
import useInputValue from '../hooks/useInputValue';
import { getCookie, setCookie } from '../shared/Cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/modules/user';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [token, setToken] = useState(false);

  const userId = useInputValue('');
  const userPw = useInputValue('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:4000/users?userId=${userId.value}&userPw=${userPw.value}`,
    );
    if (!res.data.length) {
      alert('가입되지 않은 회원입니다.');
      return;
    }

    const user = {
      userId: userId.value,
      userPw: userPw.value,
    };

    dispatch(login(user));

    // navigate(-1);
  };

  useEffect(() => {
    //token
    let myToken = getCookie('myToken');
    myToken ? setToken(true) : setToken(false);
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);
  return (
    <CommonTemplate>
      <h2>로그인</h2>
      <LoginForm onSubmit={loginUser}>
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

export default LoginPage;

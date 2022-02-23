import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';
import useInputValue from '../hooks/useInputValue';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../shared/Cookie';
import CommonHeader from '../components/common/CommonHeader';

const RegistPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);

  const userId = useInputValue('');
  const nickname = useInputValue('');
  const userPw = useInputValue('');
  const userPwConfirm = useInputValue('');

  // 이메일 형식 체크
  const checkEmailId = (userId) => {
    const regexr =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regexr.test(userId);
  };

  // 아이디 중복 체크
  const validateId = async (userId) => {
    const res = await axios.get(
      `http://localhost:4000/users/?userId=${userId}`,
    );
    return res.data.length;
  };

  const validateNickname = async (nickname) => {
    const res = await axios.get(
      `http://localhost:4000/users?nickname=${nickname}`,
    );
    return res.data.length;
  };

  const registUser = async (e) => {
    e.preventDefault();
    if (
      userId.value === '' ||
      userPw.value === '' ||
      userPwConfirm.value === '' ||
      nickname.value === ''
    ) {
      alert('양식을 채워주세요');
    }
    if (!checkEmailId(userId.value)) {
      alert('아이디는 이메일 형식으로 작성해주세요');
      return;
    }
    if (await validateId(userId.value)) {
      alert('존재하는 아이디입니다.');
      return;
    }

    if (userPw.value !== userPwConfirm.value) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (await validateNickname(nickname.value)) {
      alert('존재하는 닉네임입니다.');
      return;
    }

    const payload = {
      userId: userId.value,
      nickname: nickname.value,
      userPw: userPw.value,
    };

    await axios.post('http://localhost:4000/users', payload);
    alert('회원가입 완료');
    navigate('/login');
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
      <CommonHeader />
      <h2>회원가입</h2>
      <RegistForm onSubmit={registUser}>
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
        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="off"
          onChange={userPwConfirm.onChange}
        />
        <input
          id="nickName"
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          onChange={nickname.onChange}
        />
        <button id="registBtn" className="regist-btn" type="submit">
          회원가입
        </button>
      </RegistForm>
    </CommonTemplate>
  );
};

const RegistForm = styled.form`
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
  .regist-btn {
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

export default RegistPage;

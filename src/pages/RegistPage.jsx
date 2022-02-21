import React from 'react';
import styled from 'styled-components';
import CommonTemplate from '../components/common/CommonTemplate';

const RegistPage = () => {
  return (
    <CommonTemplate>
      <h2>회원가입</h2>
      <RegistForm>
        <input id="userId" type="id" placeholder="아이디" />
        <input id="password" type="password" placeholder="비밀번호" />
        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
        />
        <input id="nickName" type="text" placeholder="닉네임" />
        <button id="registBtn" className="regist-btn">
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
    color: #fff;
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

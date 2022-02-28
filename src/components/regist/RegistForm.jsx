import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as userAPI from '../../api/user';
import useInputValue from '../../hooks/useInputValue';
import CommonInput from '../common/CommonInput';

const RegistForm = () => {
  const navigate = useNavigate();

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

  const registUser = async (e) => {
    e.preventDefault();
    if (
      userId.value === '' ||
      userPw.value === '' ||
      userPwConfirm.value === '' ||
      nickname.value === ''
    ) {
      alert('양식을 채워주세요');
      return;
    }
    if (!checkEmailId(userId.value)) {
      alert('아이디는 이메일 형식으로 작성해주세요');
      return;
    }

    if (userPw.value !== userPwConfirm.value) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const payload = {
      user_id: userId.value,
      nickname: nickname.value,
      user_pw: userPw.value,
      pw_check: userPwConfirm.value,
    };

    const res = await userAPI.register(payload);

    if (res.status === 200) {
      navigate('/login');
    }
  };
  return (
    <RegistFormWrapper onSubmit={registUser}>
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
      <CommonInput
        id="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        onChange={userPwConfirm.onChange}
      />
      <CommonInput
        id="nickName"
        type="text"
        placeholder="닉네임"
        onChange={nickname.onChange}
      />
      <button id="registBtn" className="regist-btn" type="submit">
        회원가입
      </button>
    </RegistFormWrapper>
  );
};

const RegistFormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 2rem;
  margin: 3rem;
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

export default RegistForm;

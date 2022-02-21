import React from 'react';
import styled from 'styled-components';

const RegistPage = () => {
  return (
    <RegistWrapper>
      <label for="userId">
        아이디 : <input id="userId" type="text" />
      </label>
      <label for="nickname">
        닉네임 : <input id="nickname" type="text" />
      </label>
      <label for="userPw">
        비밀번호: <input id="userPw" type="text" />
      </label>
      <label for="userPwConfirm">
        비밀번호 확인: <input id="userPwConfirm" type="text" />
      </label>
      <button id="addUserBtn">회원가입</button>
    </RegistWrapper>
  );
};

const RegistWrapper = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  gap: 2rem;
  margin: 3rem;
`;

export default RegistPage;

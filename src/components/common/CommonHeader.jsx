import React from 'react';
import styled from 'styled-components';

const CommonHeader = () => {
  return (
    <HeaderWrapper>
      <div className="main-logo">
        <p>Magazine</p>
      </div>
      <nav className="right-nav">
        <button>로그인</button>
        <button>회원가입</button>
      </nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 3rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 2rem;
  .right-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > button {
      margin-left: 1rem;
      padding: 0.8rem;
      color: #000;
      background-color: #eee;
      font-size: 1.5rem;
      border-radius: 5px;
    }
  }
`;
export default CommonHeader;

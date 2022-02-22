import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCookie, deleteCookie } from '../../shared/Cookie';

const CommonHeader = () => {
  const [token, setToken] = useState(false);
  const navigate = useNavigate();

  const routeLogin = () => {
    navigate('/login');
  };
  const routeRegist = () => {
    navigate('/regist');
  };

  const routeWrite = () => {
    navigate('/write');
  };

  const handleLogOutBtn = () => {
    deleteCookie('myToken');
    setToken(false);
  };

  useEffect(() => {
    let cookie = getCookie('myToken');

    cookie ? setToken(true) : setToken(false);
  }, []);

  return (
    <HeaderWrapper>
      <div className="main-logo">
        <p>Magazine</p>
      </div>
      <nav className="right-nav">
        {!token ? (
          <>
            <button onClick={routeLogin}>로그인</button>
            <button onClick={routeRegist}>회원가입</button>
          </>
        ) : (
          <>
            <button onClick={routeWrite}>새 글 작성</button>
            <button onClick={handleLogOutBtn}>로그아웃</button>
          </>
        )}
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
      color: #fff;
      background-color: #000;
      font-size: 1.5rem;
      border-radius: 5px;
    }
  }
`;
export default CommonHeader;

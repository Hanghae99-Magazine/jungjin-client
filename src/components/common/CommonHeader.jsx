import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkLogin, logout } from '../../redux/modules/user';
import { getCookie } from '../../shared/Cookie';

const CommonHeader = () => {
  console.log('1');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useCallback(
    useSelector(({ user }) => {
      return user.isLogin;
    }),
  );

  console.log(isLogin);

  const routeMain = () => {
    navigate('/');
  };

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
    dispatch(logout());
  };

  useEffect(() => {
    const mytoken = getCookie('mytoken');
    if (mytoken) {
      const nickname = sessionStorage.getItem('nickname');
      dispatch(checkLogin(nickname));
    }
  }, []);

  return (
    <HeaderWrapper>
      <div className="main-logo">
        <h1 onClick={routeMain}>Magazine</h1>
      </div>
      <nav className="right-nav">
        {!isLogin ? (
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
  h1 {
    cursor: pointer;
  }
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

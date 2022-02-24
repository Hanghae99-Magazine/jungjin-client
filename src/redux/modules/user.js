import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: null,
  isLogin: false,
  err: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
      state.err = null;
    },
    loginSuccess(state, action) {
      state.isLogin = true;
      state.err = null;
      state.nickname = action.payload;
    },
    loginFailure(state, action) {
      state.isLogin = false;
      state.err = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.err = null;
    },
    logoutSuccess(state) {
      state.isLogin = false;
      state.err = null;
      state.nickname = null;
    },
    logoutFailure(state, action) {
      state.isLogin = false;
      state.err = action.payload;
    },
    checkLogin(state) {
      state.isLogin = true;
      state.err = null;
    },
    checkLoginSuccess(state, action) {
      state.isLogin = true;
      state.err = null;
      state.nickname = action.payload;
    },
    checkLoginFailure(state, action) {
      state.isLogin = false;
      state.err = action.payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  checkLogin,
  checkLoginSuccess,
  checkLoginFailure,
} = userSlice.actions;

export default userSlice.reducer;

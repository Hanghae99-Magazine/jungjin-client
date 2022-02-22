import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLogin: false,
  err: null,
};

// toolkit slice

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
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.isLogin = false;
      state.err = action.payload;
    },
  },
});

export const { login, loginSuccess, loginFailure } = userSlice.actions;

export default userSlice.reducer;

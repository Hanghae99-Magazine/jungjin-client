import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sampleAction(state, action) {
      state;
    },
  },
});

export const { sampleAction } = authSlice.actions;

export default authSlice.reducer;

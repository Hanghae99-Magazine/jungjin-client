import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLike: false,
  err: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    fetchLike(state) {
      state.isLike = false;
      state.err = null;
    },
    fetchLikeSuccess(state, action) {
      console.log(action.payload);
      state.isLike = action.payload;
      state.err = null;
    },
    fetchLikeFailure(state, action) {
      state.isLike = false;
      state.err = action.payload;
    },
  },
});

export const { fetchLike, fetchLikeSuccess, fetchLikeFailure } =
  likeSlice.actions;

export default likeSlice.reducer;

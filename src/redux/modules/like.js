import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post_id: null,
  isLike: false,
  err: null,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    fetchLike(state, action) {
      state.post_id = action.payload;
      state.isLike = false;
      state.err = null;
    },
    fetchLikeSuccess(state, action) {
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

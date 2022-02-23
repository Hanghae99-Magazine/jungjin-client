import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  err: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts(state) {
      state.loading = true;
      state.err = null;
    },
    getPostsSuccess(state, action) {
      state.loading = false;
      state.err = null;
      state.posts = action.payload;
    },
    getPostsFailure(state, action) {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const { getPosts, getPostsSuccess, getPostsFailure } =
  postsSlice.actions;

export default postsSlice.reducer;

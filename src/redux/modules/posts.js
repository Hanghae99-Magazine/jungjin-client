import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  err: null,

  post: {
    imgUrl: '',
    content: '',
    imgPosition: '',
  },
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
    addPost(state) {
      state.loading = true;
      state.err = null;
    },
    addPostSuccess(state, action) {
      state.loading = false;
      state.err = null;
      state.post.imgUrl = action.payload.post_img;
      state.post.content = action.payload.post_content;
      state.post.imgPosition = action.payload.img_position;
    },
    addPostFailure(state, action) {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const {
  getPosts,
  getPostsSuccess,
  getPostsFailure,
  addPost,
  addPostSuccess,
  addPostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imgUrl: '',
  loading: false,
  err: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    uploadImg(state) {
      state.loading = true;
      state.err = null;
    },
    uploadImgSuccess(state, action) {
      state.loading = false;
      state.err = null;
      state.imgUrl = action.payload;
    },
    uploadImgFailure(state, action) {
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const { uploadImg, uploadImgSuccess, uploadImgFailure } =
  imageSlice.actions;

export default imageSlice.reducer;

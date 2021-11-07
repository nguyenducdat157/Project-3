import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const getPosts = createAsyncThunk('post/get-posts', async () => {
  try {
    return await axiosInstance.get(`/api/post/get-posts`);
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  loading: false,
  error: '',
  post: { code: 0, data: {} },
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});
export const { reducer: postReducer } = postSlice;
export default postReducer;

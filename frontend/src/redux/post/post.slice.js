import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const getPosts = createAsyncThunk('post/get-posts', async () => {
  try {
    return await axiosInstance.get(`/api/post/get-posts`);
  } catch (error) {
    console.log(error);
  }
});

export const reactApi = createAsyncThunk('post/like', async (params) => {
  try {
    return await axiosInstance.post(`/api/post/like/${params}`);
  } catch (error) {
    return error;
  }
});

export const commentApi = createAsyncThunk('post/comment', async (data) => {
 
  try {
    const {postId, userId, content} = await data;
    return await axiosInstance.post(`/api/post/comment/${postId}`, {userId , content});
  } catch (error) {
    return error;
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

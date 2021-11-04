import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const getListUserSuggestion = createAsyncThunk('user/get-user-suggest', async () => {
  try {
    return await axiosInstance.get(`/api/user/get-user-suggest`);
  } catch (error) {
    throw error;
  }
});

export const followApi = createAsyncThunk('user/follow', async (body) => {
  try {
    return await axiosInstance.post(`/api/user/follow/${body}`);
  } catch (error) {
    throw error;
  }
});

export const unFollowApi = createAsyncThunk('user/un-follow', async (body) => {
  try {
    return await axiosInstance.post(`/api/user/un-follow/${body}`);
  } catch (error) {
    throw error;
  }
});

export const searchUser = createAsyncThunk('user/search', async (body) => {
  try {
    return await axiosInstance.get(`/api/user/search/${body}`);
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: '',
  user: { code: 0, data: {} },
  userSuggest: { code: 0, data: {} },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${getListUserSuggestion.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getListUserSuggestion.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${getListUserSuggestion.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.userSuggest = action.payload;
    },
  },
});
export const { reducer: userReducer } = userSlice;
export default userReducer;

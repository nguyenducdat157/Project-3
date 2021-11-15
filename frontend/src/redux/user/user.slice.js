import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const getListUserSuggestion = createAsyncThunk('user/get-user-suggest', async () => {
  try {
    return await axiosInstance.get(`/api/user/get-user-suggest`);
  } catch (error) {
    throw error;
  }
});

export const getAllUserSuggest = createAsyncThunk('user/get-all-user-suggest', async () => {
  try {
    return await axiosInstance.get(`/api/user/get-all-suggest`);
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

export const getFollowers = createAsyncThunk('user/get-followers', async () => {
  try {
    return await axiosInstance.get(`/api/user/get-all-follower`);
  } catch (error) {
    throw error;
  }
});

export const getFollowing = createAsyncThunk('user/get-following', async () => {
  try {
    return await axiosInstance.get(`/api/user/get-all-following`);
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: '',
  user: { code: 0, data: {} },
  userSuggest: { code: 0, data: {} },
  followers: { code: 0, data: {} },
  following: { code: 0, data: {} },
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

    // list follower
    [`${getFollowers.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getFollowers.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${getFollowers.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.followers = action.payload;
    },

    // list following
    [`${getFollowing.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getFollowing.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${getFollowing.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.following = action.payload;
    },
  },
});
export const { reducer: userReducer } = userSlice;
export default userReducer;

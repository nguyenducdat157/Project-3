import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const signUp = createAsyncThunk('auth/sign-up', async (body) => {
  try {
    return await axiosInstance.post(`/api/auth/sign-up`, body);
  } catch (error) {
    throw error;
  }
});

export const signIn = createAsyncThunk('auth/sign-in', async (body) => {
  try {
    return await axiosInstance.post(`/api/auth/sign-in`, body);
  } catch (error) {
    console.log(error);
    return error;
  }
});
export const getMe = createAsyncThunk('user/get-me', async () => {
  try {
    console.log('getMe: ', await axiosInstance.get(`/api/user/get-me`));
    return await axiosInstance.get(`/api/user/get-me`);
  } catch (error) {
    console.log(error);
    return error;
  }
});

const initialState = {
  loading: false,
  error: '',
  auth: { code: 0, data: {} },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${signIn.pending}`]: (state) => {
      state.loading = true;
    },
    [`${signIn.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${signIn.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    [`${getMe.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getMe.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${getMe.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});
export const { reducer: authReducer } = authSlice;
export default authReducer;

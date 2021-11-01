import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const signUp = createAsyncThunk('auth/sign-up', async (body) => {
    try {
        return await axiosInstance.post(`/api/auth/sign-up`, body);
    } catch (error) {
      throw error;
    }
} );

const initialState = {
  loading: false,
  error: '',
  user: { code: 0, data: {} },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${signUp.pending}`]: (state) => {
      state.loading = true;
    },
    [`${signUp.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${signUp.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});
export const { reducer: userReducer } = userSlice;
export default userReducer;



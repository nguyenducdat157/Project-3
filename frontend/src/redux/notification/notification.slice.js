import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/config.js';

export const likeNotification = createAsyncThunk('notification/like', async (idPost) => {
  try {
    return await axiosInstance.post(`/api/notification/like/${idPost}`);
  } catch (error) {
    throw error;
  }
});

export const commentNotification = createAsyncThunk('notification/comment', async (idPost) => {
  try {
    return await axiosInstance.post(`/api/notification/comment/${idPost}`);
  } catch (error) {
    throw error;
  }
});

export const followNotification = createAsyncThunk('notification/follow', async (idUser) => {
  try {
    return await axiosInstance.post(`/api/notification/follow/${idUser}`);
  } catch (error) {
    throw error;
  }
});

export const readNotification = createAsyncThunk('notification/read', async () => {
  try {
    return await axiosInstance.post(`/api/notification/read-notification`);
  } catch (error) {
    throw error;
  }
});

export const getNotifications = createAsyncThunk('notification/get', async () => {
  try {
    return await axiosInstance.get(`/api/notification/get`);
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: false,
  error: '',
  notification: { code: 0, data: {} },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [`${getNotifications.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getNotifications.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${getNotifications.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.notification = action.payload;
    },

    // read notification
    [`${readNotification.pending}`]: (state) => {
      state.loading = true;
    },
    [`${readNotification.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${readNotification.fulfilled}`]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { reducer: notificationReducer } = notificationSlice;
export default notificationReducer;

// import { configureStore } from '@reduxjs/toolkit';
// import { userReducer } from '../redux/user/user.slice';

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authReducer } from '../redux/auth/auth.slice';
import { postReducer } from '../redux/post/post.slice';
import { userReducer } from '../redux/user/user.slice';
import {messageReducer} from '../redux/message/message.slice';

import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  message: messageReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  blacklist: ['age'], //blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store;

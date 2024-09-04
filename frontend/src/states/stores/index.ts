import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth-slice';
import counterReducer from './counter/counter-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type, e.g. {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

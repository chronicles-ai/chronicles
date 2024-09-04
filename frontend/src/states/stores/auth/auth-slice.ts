import Cookies from 'js-cookie';

import { cookiesKey } from '@/config/cookies';
import User from '@/infrastructures/models/user';
import { isTokenExpired } from '@/lib/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  status: 'unauthenticated' | 'authenticated' | 'loading';
  user: User | null;
};

const initialState: AuthState = {
  status: 'unauthenticated',
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialize: (state) => {
      const authToken = Cookies.get(cookiesKey.token);

      if (authToken === null || authToken === undefined) {
        Cookies.remove(cookiesKey.token);
        Cookies.remove(cookiesKey.user);
      }

      if (authToken) {
        state.status = 'authenticated';
        state.user = JSON.parse(Cookies.get(cookiesKey.user) as string);

        if (isTokenExpired(authToken)) {
          state.status = 'unauthenticated';
          state.user = null;
          Cookies.remove(cookiesKey.token);
          Cookies.remove(cookiesKey.user);
        }
      }
    },
    login: (state, action: PayloadAction<User>) => {
      console.log('user login', action.payload);
      Cookies.set(cookiesKey.token, action.payload.token);
      Cookies.set(cookiesKey.user, JSON.stringify(action.payload));
      state.status = 'authenticated';
      state.user = action.payload;
    },
    logout: (state) => {
      Cookies.remove(cookiesKey.token);
      Cookies.remove(cookiesKey.user);
      state.status = 'unauthenticated';
      state.user = null;
    },
  },
});

export const { initialize, login, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getToken, getUser, setToken, setUser, removeToken, removeUser } from '../../utils/token';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: getUser(),
  token: getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setUser(action.payload.user);
      setToken(action.payload.token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      removeUser();
      removeToken();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
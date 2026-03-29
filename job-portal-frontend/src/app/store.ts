import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { jobApi } from '../features/jobs/jobApi';
import { applicationApi } from '../features/applications/applicationApi';
import { userApi } from '../features/user/userApi';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      jobApi.middleware,
      applicationApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
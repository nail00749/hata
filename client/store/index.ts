import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import { authAPI } from '../services/authAPI';
import alertSlice from './slices/AlertSlice';
import { errorMiddleware } from './middlewares/ErrorMiddleware';


const makeStore = () => configureStore({
  reducer: {
    authSlice,
    alertSlice,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([authAPI.middleware, errorMiddleware]),
});

const store = makeStore();
export default store;

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = typeof makeStore

export type AppStore = ReturnType<typeof makeStore>

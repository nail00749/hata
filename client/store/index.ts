import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/AuthSlice';
import { authAPI } from '../services/authAPI';
import alertSlice from './slices/AlertSlice';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import rentHouseSlice from './slices/RentHouseSlice';
import { apartmentAPI } from '../services/apartmentAPI';


const makeStore = () => configureStore({
  reducer: {
    authSlice,
    alertSlice,
    rentHouseSlice,
    [authAPI.reducerPath]: authAPI.reducer,
    [apartmentAPI.reducerPath]: apartmentAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).prepend([
    authAPI.middleware,
    apartmentAPI.middleware,
    errorMiddleware,
  ]),
});

const store = makeStore();
export default store;

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof makeStore>

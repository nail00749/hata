import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../services/authAPI';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import { apartmentAPI } from '../services/apartmentAPI';
import { createWrapper } from 'next-redux-wrapper';
import { reducer } from './reducers';


export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (gDM) => gDM().prepend([
      authAPI.middleware,
      apartmentAPI.middleware,
      errorMiddleware,
    ]),
  });

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });



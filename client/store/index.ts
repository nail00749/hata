import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import { createWrapper } from 'next-redux-wrapper';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { reducer } from './reducers';
import { authSlice } from './slices/AuthSlice';
import { api } from '../services/api';

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (gDM) => gDM({ serializableCheck: false }).prepend([
      api.middleware,
      nextReduxCookieMiddleware({
        subtrees: [
          authSlice.name,
        ],
      }),
      errorMiddleware,
    ]),
  }),
);

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });



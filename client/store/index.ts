import { configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../services/authAPI';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
import { apartmentAPI } from '../services/apartmentAPI';
import { createWrapper } from 'next-redux-wrapper';
import { reducer } from './reducers';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { authSlice } from './slices/AuthSlice';
import { userAPI } from '../services/userAPI';

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (gDM) => gDM({ serializableCheck: false }).prepend([
      nextReduxCookieMiddleware({
        subtrees: [
          authSlice.name,
        ],
      }),
      authAPI.middleware,
      apartmentAPI.middleware,
      userAPI.middleware,
      errorMiddleware,
    ]),
  }),
);

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });



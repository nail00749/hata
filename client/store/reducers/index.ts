import { combineReducers } from 'redux';
import alertSlice from '../slices/AlertSlice';
import { authSlice } from '../slices/AuthSlice';
import { HYDRATE } from 'next-redux-wrapper';
import rentHouseSlice from '../slices/RentHouseSlice';
import { userAPI } from '../../services/userAPI';
import { bookingAPI } from '../../services/bookingAPI';
import { api } from '../../services/api';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  alertSlice,
  rentHouseSlice,
  [api.reducerPath]: api.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [bookingAPI.reducerPath]: bookingAPI.reducer,
});

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return rootReducer(state, action);
  }
};

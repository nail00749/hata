import { combineReducers } from 'redux';
import alertSlice from '../slices/AlertSlice';
import authSlice from '../slices/AuthSlice';
import { HYDRATE } from 'next-redux-wrapper';
import rentHouseSlice from '../slices/RentHouseSlice';
import { apartmentAPI } from '../../services/apartmentAPI';
import { authAPI } from '../../services/authAPI';

const rootReducer = combineReducers({
  authSlice,
  alertSlice,
  rentHouseSlice,
  [authAPI.reducerPath]: authAPI.reducer,
  [apartmentAPI.reducerPath]: apartmentAPI.reducer,
})

export const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    }
  } else {
    return rootReducer(state, action)
  }
}

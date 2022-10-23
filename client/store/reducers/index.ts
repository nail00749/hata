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
    const nextState = {
      ...state,
      ...action.payload
    }
    //todo
    // if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }

}

export type RootState = ReturnType<typeof rootReducer>

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  isAuth: boolean;
  isLoad: boolean;
  error: string;
}

const initialState: authState = {
  error: '',
  isLoad: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    fetchAuthSuccess: (state) => {
      state.isAuth = true;
      state.isLoad = false;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },

});

export const { fetchAuthSuccess } = authSlice.actions;

export default authSlice.reducer;

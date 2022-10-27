import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
  isAuth: boolean;
  isLoad: boolean;
  error: string;
  openModal: boolean;
}

const initialState: authState = {
  openModal: false,
  error: '',
  isLoad: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    initState: (state) => {
      state.isAuth = Boolean(localStorage.getItem('token'));
    },
    fetchAuthSuccess: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.isLoad = false;
      //localStorage.setItem('token', action.payload)
    },
    logOut: (state) => {
      state.isAuth = false;
      localStorage.clear();
      sessionStorage.clear();
    },
    showModal: (state) => {
      state.openModal = true;
    },
    hideModal: (state) => {
      state.openModal = false;
    },
  },

});

export const { fetchAuthSuccess, showModal, hideModal, initState, logOut } = authSlice.actions;

export default authSlice.reducer;

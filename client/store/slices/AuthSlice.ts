import { createSlice } from '@reduxjs/toolkit';

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
    fetchAuthSuccess: (state) => {
      state.isAuth = true;
      state.isLoad = false;
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

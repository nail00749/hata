import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariantType } from '../../models/UI/variantsColor';
import { act } from 'react-dom/test-utils';


interface alertState {
  show: boolean;
  text: string;
  variant: VariantType;
}

const initialState: alertState = {
  show: false,
  text: '',
  variant: 'success',
};

interface payloadShow {
  variant: VariantType;
  text: string;
}

const alertSlice = createSlice({
  initialState,
  name: 'alertSlice',
  reducers: {
    showAlert: (state, action: PayloadAction<payloadShow>) => {
      state.show = true;
      state.text = action.payload.text;
      state.variant = action.payload.variant;
    },
    hideAlert: () => initialState,
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;

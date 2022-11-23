import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariantType } from '../../models/UI/variantsColor';

interface alertState {
  show: boolean;
  text: string | null;
  variant: VariantType;
}

const initialState: alertState = {
  show: false,
  text: null,
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

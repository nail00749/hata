import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { showAlert } from '../slices/AlertSlice';
import { VariantType } from '../../models/UI/variantsColor';
import { act } from 'react-dom/test-utils';

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  const { dispatch } = api;
  if (isRejectedWithValue(action)) {
    const alertMsg = {
      variant: 'error' as VariantType, text: '',
    };
    if (action.payload && action.payload.data) {
      alertMsg.text = action.payload.data.message;
    } else {
      alertMsg.text = 'Неизвестная ошибка';
    }
    dispatch(showAlert(alertMsg));
  }

  return next(action);
};

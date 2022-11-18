import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { showAlert } from '../slices/AlertSlice';
import { VariantType } from '../../models/UI/variantsColor';

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  const { dispatch } = api;
  if (isRejectedWithValue(action)) {
    const alertMsg = {
      variant: 'error' as VariantType, text: '',
    };
    if (action.payload && action.payload.data) {
      const { message } = action.payload.data;
      if (Array.isArray(message)) {
        alertMsg.text = message.map(i => `${i}`).join('\n');
      } else {
        alertMsg.text = message;
      }
    } else {
      alertMsg.text = 'Неизвестная ошибка';
    }
    dispatch(showAlert(alertMsg));
  }
  return next(action);
};

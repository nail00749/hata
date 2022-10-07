import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

export const extractRehydrationInfo = (action: AnyAction, { reducerPath }: any) => {
  if (action.type === HYDRATE) {
    return action.payload[reducerPath]
  }
};

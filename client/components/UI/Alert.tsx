import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { hideAlert } from '../../store/slices/AlertSlice';

interface AlertProps {
}

export const Alert: FC<AlertProps> = () => {
  const { show, text, variant } = useAppSelector(state => state.alertSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 1500);
    }
  }, [show]);

  const bgColor = useMemo(() => {
    switch (variant) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';

    }
  }, [variant]);

  if (!show) {
    return null;
  }

  return (
    <div
      className = {`z-50 fixed bottom-3 left-0 p-3 min-w-[200px] text-center rounded-xl ${bgColor}`}
      style = {{
        transform: 'translate(calc(50vw - 50%))',
      }}
    >
      {text}
    </div>
  );


};

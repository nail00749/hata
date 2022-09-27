import { useState } from 'react';

export const useToggle = (initValue = false): [boolean, () => void] => {
  const [state, setState] = useState(initValue);

  const handleToggle = () => {
    setState(prev => !prev);
  };

  return [state, handleToggle];
};

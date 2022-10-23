import { FC, HTMLProps } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({ value, placeholder, ...inputProps }) => {
  return (
    <label
      className='inputBox'
    >
      <input
        value = {value}
        {...inputProps}
      />
      <span>
        {placeholder}
      </span>
    </label>
  );
};

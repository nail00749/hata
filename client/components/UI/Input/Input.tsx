import { FC, HTMLProps } from 'react';
import styles from './input.module.scss'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({ placeholder, ...inputProps }) => {
  return (
    <label
      className={styles.inputBox}
    >
      <input
        {...inputProps}
      />
      <span>
        {placeholder}
      </span>
    </label>
  );
};

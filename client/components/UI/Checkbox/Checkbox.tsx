import { FC, HTMLProps } from 'react';
import styles from './checkbox.module.scss';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ label, ...otherProps }) => {
  return (
    <label
      className={styles.checkbox}
    >
      <input
        type='checkbox'
        {...otherProps}
      />
      <span>
        {label}
      </span>
    </label>
  );
};

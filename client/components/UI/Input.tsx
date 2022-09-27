import { FC, HTMLProps, useState } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input: FC<InputProps> = ({ value, placeholder, ...inputProps }) => {
  const [focus, setFocus] = useState(false);

  const isCenterLabel = !!(value || focus);

  return (
    <label
      className = 'relative m-3 drop-shadow-xl'
    >
      <div
        className = {`
        ${isCenterLabel ? 'text-[10px]' : 'text-[xs]'} 
        mb-1 
        absolute
        ${isCenterLabel ? 'top-[3]' : 'top-[15%]'} 
        left-2.5
        z-10
        transition-all
        text-white 
        `}
        style = {{
          fontSize: isCenterLabel ? 10 : undefined,
        }}
      >
        {placeholder}
      </div>
      <input
        value = {value}
        className = {`rounded-md p-2.5 pl-4 placeholder:text-stone-500 hover:scale-105 focus:scale-110 text-white`}
        //placeholder = {placeholder}
        onFocus = {() => setFocus(true)}
        onBlur = {() => setFocus(false)}
        {...inputProps}
      />
    </label>
  );
};

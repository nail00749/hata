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
      <span
        className = {`
        ${isCenterLabel ? 'text-[10px]' : 'text-[xs]'} 
        mb-1 
        absolute
        ${isCenterLabel ? 'top-[3]' : 'top-[15%]'} 
        left-2.5
        z-10
        transition-all
        text-black 
        `}
        style = {{
          fontSize: isCenterLabel ? 10 : undefined,
        }}
      >
        {placeholder}
      </span>
      <input
        value = {value}
        className = {`
        rounded-md 
        p-2.5 
        pl-4 
        placeholder:text-black 
        text-black 
        border-solid 
        border-2 
        border-sky-500 
        hover:scale-105 
        focus:scale-110  
        focus:border-sky-500
        focus:outline-none
        `}
        //placeholder = {placeholder}
        onFocus = {() => setFocus(true)}
        onBlur = {() => setFocus(false)}
        {...inputProps}
      />
    </label>
  );
};

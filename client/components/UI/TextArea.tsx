import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface TextAreaProps extends ButtonHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
  cols?: number;
  rows?: number;
}

export const TextArea: FC<TextAreaProps> = ({cols = 20, rows=5,  children, ...otherProps }) => {
  return (
    <textarea
      className='max-w-xs border-2 border-solid border-sky-500 rounded-xl p-3 m-3 '
      name = ''
      id = ''
      cols={cols}
      rows={rows}
      {...otherProps}
    >
      {children}
    </textarea>
  );
};

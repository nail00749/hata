import { FC, InputHTMLAttributes } from 'react';
import Image from 'next/image';


interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const FileInput: FC<FileInputProps> = ({ ...otherProps }) => {
  return (
    <span
      className = 'm-3 p-3 max-w-[210px] border-2 border-solid bg-sky-200 rounded-md flex items-center drop-shadow-xl'
    >
      <label
        htmlFor = 'file-input'
        className = 'mr-3'
      >
        Выберите файлы
      </label>
      <input
        id = 'file-input'
        className = 'opacity-0 hidden'
        type = 'file'
        {...otherProps}
      />
      <Image
        src = {'/file.svg'}
        width = {20}
        height = {20}
      />
    </span>
  );
};

import React, { FC } from 'react';

interface HeaderModalProps {
  title: string;
  handlerVisible: (e: React.MouseEvent) => void;
}

export const HeaderModal: FC<HeaderModalProps> = ({ title, handlerVisible }) => {
  return (
    <div
      className = 'relative flex justify-center bg-stone-800 text-white p-5 rounded-t-md text-xl font-bold'
    >
      {title}
      <button
        className = 'absolute top-2 right-3 text-black'
        onClick = {handlerVisible}
      >
        X
      </button>
    </div>
  );
};

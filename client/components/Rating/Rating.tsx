import { FC } from 'react';
import Image from 'next/image';

interface RatingProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => () => void;
}

export const Rating: FC<RatingProps> = ({ min = 0, max = 5, value, onChange }) => {
  const arr = Array(max).fill(null).map((u, i) => i + 1);

  return (
    <div
      className = 'flex'
    >
      {
        arr.map(star => {
          const img = star > value ? '/starEmpty.svg' : '/starFilled.svg';
          return (
            <div
              onClick = {onChange(star)}
            >
              <Image
                src = {img}
                width = {25}
                height = {25}
              />
            </div>
          );
        })
      }
    </div>
  );
};

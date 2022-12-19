import { Input } from '../UI/Input/Input';
import { ChangeEvent, FC } from 'react';

interface FiltersProps {
  filters: {
    minPrice?: number
    maxPrice?: number
  };
  handlerFilters: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Filters: FC<FiltersProps> = ({ filters, handlerFilters }) => {
  return (
    <div
      className = 'flex flex-col hidden md:flex'
    >
      <Input
        value = {filters.minPrice}
        onChange = {handlerFilters}
        name = 'minPrice'
        placeholder = {'Min price'}
        type = 'number'
      />
      <Input
        value = {filters.maxPrice}
        onChange = {handlerFilters}
        name = 'maxPrice'
        placeholder = {'Max price'}
        type = 'number'
      />
    </div>
  );
};

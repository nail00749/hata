import { Input } from './UI/Input';

export const Filters = () => {
  return (
    <div
      className='flex flex-col'
    >
      <Input
        placeholder={'Min price'}
      />
      <Input
        placeholder={'Max price'}
      />
    </div>
  );
};

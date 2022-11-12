import { comforts } from '../../constants/comforts';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setComforts } from '../../store/slices/RentHouseSlice';

export const Comforts = () => {
  const comfortsRent: string[] = useAppSelector(state => state.rentHouseSlice.comforts);
  const dispatch = useAppDispatch();

  const handlerComforts = (c: string) => () => {
    dispatch(setComforts(c));
  };

  return (
    <div
      className = 'grid grid-cols-2 justify-items-start m-3'
    >
      {
        comforts.map(comfort => {
          //todo checked
          return (
            <Checkbox
              key = {comfort}
              label = {comfort}
              onChange = {handlerComforts(comfort)}
            />
          );
        })
      }
    </div>
  );
};

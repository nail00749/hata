import { ToggleButtonGroup } from '../UI/ToggleButton/ToggleButtonGroup';
import { ToggleButton } from '../UI/ToggleButton/ToggleButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTypeRent } from '../../store/slices/RentHouseSlice';

export const RentType = () => {
  const { rentType } = useAppSelector(state => state.rentHouseSlice);
  const dispatch = useAppDispatch()

  const handlerType = (value: string) => dispatch(setTypeRent(value))

  return (
    <div>
      <ToggleButtonGroup
        value = {rentType}
        onClick = {handlerType}
      >
        <ToggleButton value = 'flat'>Квартира</ToggleButton>
        <ToggleButton value = 'room'>Комната</ToggleButton>
        <ToggleButton value = 'house'>Дом</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

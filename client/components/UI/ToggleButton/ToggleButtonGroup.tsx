import React, { Children, cloneElement, FC, ReactElement, MouseEvent } from 'react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';
import { OrientationType } from '../../../models/UI/Orientation';


interface ToggleButtonGroupProps {
  children?: ReactElement<ToggleButtonProps> | Array<ReactElement<ToggleButtonProps>>;
  value?: any;
  onClick?: (val: any, e: MouseEvent<HTMLButtonElement>) => void;
  orientation?: OrientationType
}

export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({ children, value, onClick, orientation = 'horizontal'  }) => {
  return (
    <div>
      тип жилья
      <div
        className={`flex ${orientation === 'veritical' ? 'flex-col' : ''}`}
      >
        {Children.map(children, (child) => {
          if (child?.type != ToggleButton) {
            return;
          }
          return cloneElement({ ...child }, { active: value === child.props.value, setValue: onClick, orientation });
        })
        }
      </div>
    </div>
  );
};

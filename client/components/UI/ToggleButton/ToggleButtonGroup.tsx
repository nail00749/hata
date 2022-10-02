import React, { Children, cloneElement, FC, ReactElement, MouseEvent } from 'react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';


interface ToggleButtonGroupProps {
  children?: ReactElement<ToggleButtonProps> | Array<ReactElement<ToggleButtonProps>>;
  value?: any;
  onClick?: (val: any, e: MouseEvent<HTMLButtonElement>) => void;
}

export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({ children, value, onClick }) => {
  return (
    <div>
      {Children.map(children, (child) => {
        if (child?.type != ToggleButton) {
          return;
        }
        return cloneElement({ ...child }, { active: value === child.props.value, setValue: onClick });
      })
      }
    </div>
  );
};

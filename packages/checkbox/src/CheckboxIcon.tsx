import React, { forwardRef } from 'react';
import { useCheckbox } from './CheckboxProvider';

const CheckboxIcon = (StyledCheckboxIcon: any) =>
  forwardRef(({ children, ...props }: any) => {
    const {
      isChecked,
      isDisabled,
      isHovered,
      isInvalid,
      isReadOnly,
      isPressed,
      isFocused,
      isIndeterminate,
      isFocusVisible,
    } = useCheckbox('CheckboxContext');

    return (
      <StyledCheckboxIcon
        states={{
          hover: isHovered,
          checked: isChecked,
          disabled: isDisabled,
          focusVisible: isFocusVisible,
          invalid: isInvalid,
          readOnly: isReadOnly,
          pressed: isPressed,
          focused: isFocused,
          indeterminate: isIndeterminate,
        }}
        {...props}
        opacity={isChecked ? 1 : 0}
      >
        {children}
      </StyledCheckboxIcon>
    );
  });

export default CheckboxIcon;

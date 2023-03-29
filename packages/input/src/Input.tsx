import React, { forwardRef, useContext } from 'react';
import { useFormControl } from '@gluestack-ui/form-control';
import { StyledInputContext } from './InputContext';

export const Input = (StyledInput: any) =>
  forwardRef(
    ({ children, onKeyPress, type = 'text', ...props }: any, ref: any) => {
      const { isDisabled, isReadOnly, isFocused, setIsFocused } =
        useContext(StyledInputContext);

      const inputProps = useFormControl({
        isDisabled: props.isDisabled,
        isInvalid: props.isInvalid,
        isReadOnly: props.isReadOnly,
        isRequired: props.isRequired,
        nativeID: props.nativeID,
      });

      const handleFocus = (focusState: boolean, callback: any) => {
        setIsFocused(focusState);
        callback();
      };

      return (
        <StyledInput
          {...props}
          states={{
            focus: isFocused,
          }}
          disabled={isDisabled || inputProps.disabled}
          secureTextEntry={type === 'password'}
          accessible
          editable={isDisabled || isReadOnly ? false : true}
          onKeyPress={(e: any) => {
            e.persist();
            onKeyPress && onKeyPress(e);
          }}
          onFocus={(e: any) => {
            handleFocus(
              true,
              props?.onFocus ? () => props?.onFocus(e) : () => {}
            );
          }}
          onBlur={(e: any) => {
            handleFocus(
              false,
              props?.onBlur ? () => props?.onBlur(e) : () => {}
            );
          }}
          ref={ref}
        >
          {children}
        </StyledInput>
      );
    }
  );

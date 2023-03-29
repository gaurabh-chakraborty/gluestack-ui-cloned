import React, { forwardRef } from 'react';
// import type { ISelectProps } from './types';
import { useControllableState } from '@gluestack-ui/hooks';
import { SelectContext } from './SelectContext';
import { mergeRefs } from '@gluestack-ui/utils';
import { StyleSheet } from 'react-native';

export const SelectItemList = (StyledSelectItemList: any) =>
  forwardRef(
    (
      {
        children,
        selectedValue: selectedOption,
        onValueChange,
        defaultValue,
        placeholder,
        onOpen,
        onClose,
        ...props
      }: any,
      ref: any
    ) => {
      const {
        isHovered,
        hoverRef,
        hoverProps,
        isFocused,
        setFocused,
        isDisabled,
        isReadOnly,
        isInvalid,
        focusProps,
        isFocusVisible,
      } = React.useContext(SelectContext);

      const [value, setValue] = useControllableState({
        value: selectedOption,
        defaultValue,
        onChange: (newValue) => {
          onValueChange && onValueChange(newValue);
        },
      });

      const tempFix = '__NativebasePlaceholder__';

      const itemsList: Array<{
        label: string;
        value: string;
      }> = React.Children.toArray(children).map((child: any) => {
        return {
          label: child?.props?.label,
          value: child?.props?.value,
        };
      });

      const selectedItemArray = itemsList.filter(
        (item: any) => item?.value === value
      );

      const selectedItem =
        selectedItemArray && selectedItemArray.length
          ? selectedItemArray[0]
          : null;

      const commonInput = (
        <StyledSelectItemList
          states={{
            hover: isHovered,
            active: isFocused,
            disable: isDisabled,
            invalid: isInvalid,
            readonly: isReadOnly,
            focusvisible: isFocusVisible,
          }}
          aria-hidden={true}
          editable={false}
          focusable={false}
          importantForAccessibility="no"
          placeholder={placeholder}
          value={selectedItem ? selectedItem.label : ''}
          pointerEvents="none"
          {...props}
        />
      );

      return (
        <>
          <select
            aria-readonly={isReadOnly}
            disabled={isDisabled}
            {...focusProps}
            {...hoverProps}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            ref={mergeRefs([ref, hoverRef])}
            value={selectedOption === null ? tempFix : value}
            aria-label={placeholder}
            style={StyleSheet.flatten([
              {
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                position: 'absolute',
                opacity: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              },
            ])}
            onFocus={() => {
              setFocused(true);
              onOpen && onOpen();
            }}
            onBlur={() => {
              setFocused(false);
              onClose && onClose();
            }}
          >
            <option disabled value={tempFix}>
              {placeholder}
            </option>
            {children}
          </select>
          {commonInput}
        </>
      );
    }
  );

// StyleSheet.create({

// })

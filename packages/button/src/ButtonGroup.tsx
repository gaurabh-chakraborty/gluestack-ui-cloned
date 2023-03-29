import React, { forwardRef } from 'react';
import { flattenChildren } from '@gluestack-ui/utils';

export const ButtonGroup = (
  StyledButtonGroup: any,
  StyledButtonGroupHSpacer: any,
  StyledButtonGroupVSpacer: any
) =>
  forwardRef(
    (
      {
        space,
        direction = 'row',
        isAttached,
        isDisabled,
        children,
        reversed,
        ...props
      }: any,
      ref: any
    ) => {
      let computedChildren;
      let childrenArray = React.Children.toArray(flattenChildren(children));
      childrenArray = reversed ? [...childrenArray].reverse() : childrenArray;

      if (childrenArray) {
        computedChildren = childrenArray.map((child: any, index: number) => {
          if (typeof child === 'string' || typeof child === 'number') {
            return child;
          }

          const clonedChild = React.cloneElement(child, {
            ...child.props,
            isDisabled,
          });

          return (
            <React.Fragment key={child.key ?? `spaced-child-${index}`}>
              {clonedChild}
              {index < childrenArray.length - 1 &&
                (direction === 'column' ? (
                  <StyledButtonGroupHSpacer size={!isAttached ? space : 0} />
                ) : (
                  <StyledButtonGroupVSpacer size={!isAttached ? space : 0} />
                ))}
            </React.Fragment>
          );
        });
      }

      if (computedChildren)
        return (
          <StyledButtonGroup
            ref={ref}
            {...props}
            sx={{
              flexDirection: direction,
            }}
          >
            {computedChildren}
          </StyledButtonGroup>
        );
      return null;
    }
  );

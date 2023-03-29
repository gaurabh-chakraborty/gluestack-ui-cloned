import React, { forwardRef } from 'react';
import { AlertDialogContext } from './Context';
import { Platform } from 'react-native';
import { FocusScope } from '@react-native-aria/focus';
import { OverlayAnimatePresence } from './OverlayAnimatePresence';

const AlertDialogContent = (
  StyledAlertDialogContent: any,
  AnimatePresence: any
) =>
  forwardRef((props: any, ref?: any) => {
    const { initialFocusRef, finalFocusRef, handleClose, visible } =
      React.useContext(AlertDialogContext);

    React.useEffect(() => {
      const finalRefVal = finalFocusRef ? finalFocusRef.current : null;
      if (visible) {
        if (initialFocusRef && initialFocusRef.current) {
          //@ts-ignore
          initialFocusRef.current.focus();
        }
      } else {
        if (finalRefVal) {
          //@ts-ignore
          finalRefVal.focus();
        }
      }
    }, [initialFocusRef, finalFocusRef, visible]);

    return (
      <FocusScope
        contain={visible}
        autoFocus={visible && !initialFocusRef}
        restoreFocus={visible && !finalFocusRef}
      >
        <OverlayAnimatePresence
          visible={visible}
          AnimatePresence={AnimatePresence}
        >
          <StyledAlertDialogContent
            {...props}
            ref={ref}
            onAccessibilityEscape={handleClose}
            exit={true}
            //@ts-ignore - web only
            aria-modal="true"
            //@ts-ignore - web only
            accessibilityRole={Platform.OS === 'web' ? 'dialog' : undefined}
            accessibilityViewIsModal
          >
            {props.children}
          </StyledAlertDialogContent>
        </OverlayAnimatePresence>
      </FocusScope>
    );
  });

export default AlertDialogContent;

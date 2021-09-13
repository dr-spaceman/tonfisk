import { useButton } from "@react-aria/button";
import { useDialog } from "@react-aria/dialog";
import { FocusScope, useFocusRing } from "@react-aria/focus";
import { useModal, useOverlay, usePreventScroll } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import React, { ReactElement, ReactNode, useRef } from "react";

import { Close } from "../icons/Close";
import { atoms } from "../theme.css";
import { closeButton, fullPageDiv, modalDiv } from "./ModalDialog.css";

const CloseButton = (props: any) => {
  const { focusProps, isFocusVisible } = useFocusRing();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...mergeProps(focusProps, buttonProps)}
      ref={ref}
      // TODO: recipe
      className={`${closeButton} ${atoms({
        boxShadow: isFocusVisible ? "outline" : "none",
      })}`}
    >
      <Close />
    </button>
  );
};

type Props = {
  /**
   * Title of the modal.
   */
  title: string;
  /**
   * Components to display inside the modal.
   */
  children: ReactNode;
  /**
   * Whether modal is open.
   */
  isOpen?: boolean;
  /**
   * Callback called when modal is closed (can happen with ESC key or clicking
   * outside).
   */
  onClose?: () => void;
  /**
   * Whether modal can be dismissed by ESC or click outside.
   */
  isDismissable?: boolean;
};

/**
 * ModalDialog component.
 *
 *  ## Usage
 *
 * ```jsx
 * import { OverlayContainer } from "@react-aria/overlays";
 * import { useOverlayTriggerState } from "@react-stately/overlays";
 * import { Button, HorizontalLine, ModalDialog } from "TODO_LIB_NAME";
 *
 * export default function Modal() {
 *   const state = useOverlayTriggerState({});
 *     return (
 *     <div>
 *       <Button onPress={() => state.open()}>Open Dialog</Button>
 *       {state.isOpen && (
 *         <OverlayContainer>
 *           <ModalDialog
 *             title="Enter your name"
 *             isOpen
 *             onClose={state.close}
 *             isDismissable
 *           >
 *             <HorizontalLine />
 *             <div>Test</div>
 *           </ModalDialog>
 *         </OverlayContainer>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * TODO
 */
export function ModalDialog(props: Props): ReactElement {
  const { title, children } = props;

  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll();
  const { modalProps } = useModal();

  // Get props for the dialog and its title
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div className={fullPageDiv} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...mergeProps(overlayProps, dialogProps, modalProps)}
          ref={ref}
          className={modalDiv}
        >
          <div
            // TODO: move to *.css.ts.
            className={atoms({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "m",
            })}
          >
            <h3
              {...titleProps}
              // TODO: move to *.css.ts.
              className={atoms({
                color: {
                  lightMode: "black",
                  darkMode: "gray-200",
                },
                margin: "l",
              })}
            >
              {title}
            </h3>
            <CloseButton onPress={props.onClose} />
          </div>
          {children}
        </div>
      </FocusScope>
    </div>
  );
}

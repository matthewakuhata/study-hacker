import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

import "./Modal.scss";
export interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  show: boolean;
  closeModal: () => void;
  width?: number;
}
const Modal: React.FC<ModalProps> = ({
  show,
  closeModal,
  children,
  className,
  width,
}) => {
  if (!show) return <></>;

  return createPortal(
    <>
      <div
        style={
          width
            ? ({ "--width": `${width}px` } as React.CSSProperties)
            : undefined
        }
        className={`modal-popup ${className}`}
      >
        {children}
      </div>
      <Backdrop onClick={closeModal} />
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;

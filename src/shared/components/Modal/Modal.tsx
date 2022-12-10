import React, { CSSProperties } from "react";
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
  width = 350,
}) => {
  if (!show) return <></>;

  return createPortal(
    <>
      <div
        style={{ "--width": `${width}px` } as CSSProperties}
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

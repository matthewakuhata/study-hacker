import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

import "./Modal.scss";
interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  show: boolean;
  closeModal: () => void;
}
const Modal: React.FC<ModalProps> = ({ show, closeModal }) => {
  if (!show) return <></>;

  return createPortal(
    <>
      <div className="modal-popup">Modal</div>
      <Backdrop onClick={closeModal} />
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;

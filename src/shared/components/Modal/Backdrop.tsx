import React from "react";
import { createPortal } from "react-dom";

import "./Backdrop.scss";
const Backdrop = ({ onClick }: { onClick: () => void }) => {
  return createPortal(
    <div onClick={onClick} className="backdrop" />,
    document.getElementById("backdrop")!
  );
};

export default Backdrop;

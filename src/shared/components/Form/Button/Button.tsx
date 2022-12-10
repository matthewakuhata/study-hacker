import React from "react";

import "./styles.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  displayType?: string;
  size?: string;
  isSelected?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  displayType = "default",
  size = "m",
  isSelected = false,
  children,
}) => {
  return (
    <button
      className={`button button--${displayType} ${
        isSelected && "button--selected"
      } button--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

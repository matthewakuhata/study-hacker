import React from "react";

import "./styles.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  displayType?: string;
  displaySize?: string;
  isSelected?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  displayType = "default",
  displaySize = "m",
  isSelected = false,
  children,
  className,
  color,
}) => {
  return (
    <button
      className={`
        ${className}
        ${isSelected && "button--selected"}
        button--${displayType}
        button--${color}
        button--${displaySize}
        button
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

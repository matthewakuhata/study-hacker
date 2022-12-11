import React from "react";
import "./Input.scss";
const Input = ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return <input className={`input ${className}`} {...props} />;
};

export default Input;

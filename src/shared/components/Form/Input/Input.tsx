import React, { forwardRef } from "react";
import "./Input.scss";
const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ className, ...props }, ref) => {
  return <input ref={ref} className={`input ${className}`} {...props} />;
});

export default Input;

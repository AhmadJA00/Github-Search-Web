import React from "react";
import type { ButtonProps } from "../types";

const CButton: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  icon,
  onKeyDown,
  disabled,
}) => {
  return (
    <button
      className={`bg-secondary/80 hover:bg-secondary px-2 md:px-5 py-2 text-xs md:text-base  
              transition-all duration-200 active:bg-secondary/60 disabled:opacity-50 disabled:cursor-not-allowed
              rounded-e-lg cursor-pointer flex items-center justify-center gap-2 md:gap-5 ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default CButton;

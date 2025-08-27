import React from "react";
import type { ButtonProps } from "../types";

const CButton: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  icon,
  onKeyDown,
}) => {
  return (
    <button
      className={`bg-secondary/80 hover:bg-secondary px-5 py-2  
              transition-all duration-200 active:bg-secondary/60
              rounded-e-lg cursor-pointer flex items-center justify-center gap-5 ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {icon}
      {children}
    </button>
  );
};

export default CButton;

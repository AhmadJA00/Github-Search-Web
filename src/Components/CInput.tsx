import React from "react";
import type { InputProps } from "../types";
import { useSearchParams } from "react-router-dom";
import { ClearIcon } from "./Icons";

const CInput: React.FC<InputProps> = ({
  type,
  placeholder,
  onChange,
  onBlur,
  id,
  label,
  min,
  max,
  value,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClear = () => {
    searchParams.delete(id);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-1 ">
      {label && (
        <label htmlFor={id} className="text-sm border-b border-secondary">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="w-full p-1 px-2 rounded-md border bg-primary border-gray focus:outline-none focus:border-secondary text-sm"
          onChange={onChange}
          id={id}
          onBlur={onBlur}
          min={min}
          max={max}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            tabIndex={-1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100  group-hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Clear input"
          >
            <ClearIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CInput;

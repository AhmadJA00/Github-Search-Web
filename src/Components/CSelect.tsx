import React from "react";
import type { SelectProps } from "../types";
import { useSearchParams } from "react-router-dom";
import { ClearIcon } from "./Icons";

const CSelect: React.FC<SelectProps> = ({
  value,
  options,
  onChange,
  id,
  label,
  className,
  allowClear = true,
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
        <select
          value={value}
          className={`w-86  md:w-52 p-1 px-2  rounded-md border bg-primary border-gray focus:outline-none focus:border-secondary text-sm ${className}`}
          onChange={onChange}
          id={id}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {value && allowClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100  group-hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Clear input"
          >
            <ClearIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CSelect;

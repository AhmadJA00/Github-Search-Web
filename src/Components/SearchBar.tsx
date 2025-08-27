import React from "react";
import CButton from "./CButton";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  const handleSearchClick = () => {
    searchParams.set("search", search);
    setSearchParams(searchParams);
  };
  const handleSearchOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchClick();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form
      onSubmit={handleSearchOnEnter}
      className="flex border border-gray/75 rounded-lg hover:border-gray transition-all duration-200 group"
    >
      <input
        value={search}
        onChange={handleSearchChange}
        type="text"
        placeholder="Search"
        className="flex-1 bg-primary px-5 py-2 placeholder:text-gray/75 w-full 
                    outline-none   transition-all duration-200 
                    rounded-s-lg border-e border-gray/75 group-hover:border-gray"
      />
      <CButton
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        }
        onClick={handleSearchClick}
      >
        Search
      </CButton>
    </form>
  );
}

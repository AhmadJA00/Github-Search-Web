import React from "react";
import CButton from "./CButton";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const { pathname } = useLocation();
  const debouncedSearch = useDebounce(search, 1000);
  console.log(debouncedSearch);

  const handleSearchClick = () => {
    searchParams.set("search", search);
    setSearchParams(searchParams);
  };
  const handleSearchOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchClick();
  };

  React.useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      searchParams.set("search", debouncedSearch);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  return (
    <form
      onSubmit={handleSearchOnEnter}
      className={`flex border border-gray/75 rounded-lg hover:border-gray transition-all duration-200 group ${className}`}
    >
      <input
        value={search}
        onChange={handleSearchChange}
        type="text"
        placeholder={
          pathname === "/repositories" ? "Search Repositories" : "Search Users"
        }
        className="flex-1 bg-primary px-2 md:px-5 py-2 placeholder:text-gray/75 w-full text-xs md:text-base
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

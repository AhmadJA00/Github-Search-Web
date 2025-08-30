import React from "react";
import CButton from "./CButton";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useUserData } from "../hooks/useUserData";
import { useReposData } from "../hooks/useReposData";

export default function SearchBar({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [warningText, setWarningText] = React.useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const { loading, loadingRepos } = useUserData();
  const { loadingRepositories } = useReposData();

  const handleSearchClick = () => {
    if (search.trim() === "") {
      setWarningText("Please enter a username to search");
      return;
    }
    setWarningText("");
    searchParams.set("search", search);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  const handleSearchOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    if (search.trim() === "") {
      setWarningText("Please enter a username to search");
      return;
    }
    setWarningText("");
    e.preventDefault();
    handleSearchClick();
  };

  React.useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      searchParams.set("search", debouncedSearch);
    } else {
      searchParams.delete("search");
    }
    searchParams.set("page", "1");

    setSearchParams(searchParams);
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarningText("");
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
        placeholder={warningText || "Search Users"}
        className={`flex-1 bg-primary px-2 md:px-5 py-2 placeholder:text-gray/75 w-full text-xs md:text-base
                    outline-none   transition-all duration-200 
                    rounded-s-lg border-e border-gray/75 group-hover:border-gray
                    ${warningText ? "placeholder:text-red-500" : ""}`}
      />
      <CButton
        disabled={loading || loadingRepos || loadingRepositories}
        className="rounded-e-lg md:hidden "
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
        <span className="hidden md:block">Search</span>
      </CButton>
    </form>
  );
}

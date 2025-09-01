import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useUserData } from "../hooks/useUserData";
import { useReposData } from "../hooks/useReposData";
import CButton from "./CButton";
import { SearchIcon } from "./Icons";

export default function SearchBar({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchBy = searchParams.get("searchBy") || "repos";
  const { pathname } = useLocation();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [warningText, setWarningText] = React.useState("");
  const [isManualSearch, setIsManualSearch] = React.useState(false);
  const debouncedSearch = useDebounce(search, 1000);
  const { loading, loadingRepos } = useUserData();
  const { loadingRepositories } = useReposData();

  const getWarningText = () => {
    return searchBy === "users"
      ? "Please enter a username to search"
      : searchBy === "orgs"
      ? "Please enter an organization name to search"
      : "Please enter a repository name to search";
  };

  const getPlaceholderText = () => {
    return warningText
      ? warningText
      : pathname === "/"
      ? "Search Users"
      : searchBy === "users"
      ? "Search By Users"
      : searchBy === "orgs"
      ? "Search By Organizations"
      : "Search By Repository's Name";
  };

  const handleSearchClick = () => {
    if (search.trim() === "") {
      setWarningText(getWarningText());
      return;
    }
    setWarningText("");
    setIsManualSearch(true);
    searchParams.set("search", search);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleSearchOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    if (search.trim() === "") {
      setWarningText(getWarningText());
      return;
    }
    setWarningText("");
    e.preventDefault();
    handleSearchClick();
  };

  React.useEffect(() => {
    if (!isManualSearch) {
      const newSearchParams = new URLSearchParams(window.location.search);

      if (debouncedSearch.trim() !== "") {
        newSearchParams.set("search", debouncedSearch);
      } else {
        newSearchParams.delete("search");
      }
      newSearchParams.set("page", "1");

      setSearchParams(newSearchParams);
    }
  }, [debouncedSearch, setSearchParams, isManualSearch]);

  React.useEffect(() => {
    setWarningText("");
  }, [pathname, searchBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarningText("");
    setSearch(e.target.value);
    setIsManualSearch(false);
  };

  return (
    <form
      onSubmit={handleSearchOnEnter}
      className={`flex border border-gray/30 rounded-lg hover:border-gray/75 transition-all duration-200 group ${className}`}
    >
      <input
        value={search}
        onChange={handleSearchChange}
        type="text"
        placeholder={getPlaceholderText()}
        className={`flex-1 bg-primary px-2 md:px-5 py-2 placeholder:text-gray/75 w-full text-xs md:text-base
                    outline-none   transition-all duration-200 
                    rounded-s-lg border-e border-gray/30 group-hover:border-gray
                    ${warningText ? "placeholder:text-red-500" : ""}`}
      />
      <CButton
        disabled={loading || loadingRepos || loadingRepositories}
        className="rounded-e-lg"
        icon={<SearchIcon />}
        onClick={handleSearchClick}
      >
        <span className="hidden md:block">Search</span>
      </CButton>
    </form>
  );
}

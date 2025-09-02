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
  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  const { pathname } = useLocation();
  const [warningText, setWarningText] = React.useState("");
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
  const handleChangeWarningText = (message: string) => {
    setWarningText(message);
    setTimeout(() => {
      setWarningText("");
    }, 2000);
  };

  const handleSearchClick = () => {
    if (searchParams.get("search") === search) {
      handleChangeWarningText("Plese enter a different search key!");
      return;
    }
    if (search.trim() === "") {
      handleChangeWarningText(getWarningText());
      return;
    }
    searchParams.set("search", search);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleSearchOnEnter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParams.get("search") === search) {
      handleChangeWarningText("Plese enter a different search key!");
      return;
    }
    if (warningText) return;
    if (search.trim() === "") {
      handleChangeWarningText(getWarningText());
      return;
    }

    handleSearchClick();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarningText("");
    setSearch(e.target.value);
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

  return (
    <form
      onSubmit={handleSearchOnEnter}
      className={`flex border border-gray/30 rounded-lg hover:border-gray/75 transition-all duration-200 group ${className}`}
    >
      <input
        value={warningText || search}
        onChange={handleSearchChange}
        type="text"
        placeholder={getPlaceholderText()}
        className={`flex-1 bg-primary px-2 md:px-5 py-2 placeholder:text-gray/75 w-full text-xs md:text-base
                    outline-none   transition-all duration-200 
                    rounded-s-lg border-e border-gray/30 group-hover:border-gray
                    ${
                      warningText ? "placeholder:text-red-500 text-red-500" : ""
                    }`}
      />
      <CButton
        disabled={
          loading || loadingRepos || loadingRepositories || !!warningText
        }
        className="rounded-e-lg"
        icon={<SearchIcon />}
        onClick={handleSearchClick}
      >
        <span className="hidden md:block">Search</span>
      </CButton>
    </form>
  );
}

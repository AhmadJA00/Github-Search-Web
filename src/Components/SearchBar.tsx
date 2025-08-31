import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useUserData } from "../hooks/useUserData";
import { useReposData } from "../hooks/useReposData";
import CButton from "./CButton";
import { SearchIcon } from "./Icons";

export default function SearchBar({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [warningText, setWarningText] = React.useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const { loading, loadingRepos } = useUserData();
  const { loadingRepositories } = useReposData();

  const getWarningText = () => {
    if (searchParams.get("searchBy") === "repos") {
      return "Please enter a repository name to search";
    } else if (searchParams.get("searchBy") === "orgs") {
      return "Please enter an organization name to search";
    } else {
      return "Please enter a username to search";
    }
  };

  const handleSearchClick = () => {
    if (search.trim() === "") {
      setWarningText(getWarningText());
      return;
    }
    setWarningText("");
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
      className={`flex border border-gray/30 rounded-lg hover:border-gray/75 transition-all duration-200 group ${className}`}
    >
      <input
        value={search}
        onChange={handleSearchChange}
        type="text"
        placeholder={
          warningText
            ? warningText
            : pathname === "/"
            ? "Search Users"
            : searchParams.get("searchBy") === "repos"
            ? "Search By Repository's Name"
            : searchParams.get("searchBy") === "orgs"
            ? "Search By Organizations"
            : "Search By Users"
        }
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

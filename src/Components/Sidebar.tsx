import React from "react";
import { useSearchParams } from "react-router-dom";
import { ClockIcon, CPUIcon, DeleteIcon, ForkIcon, StarIcon } from "./Icons";
import { helpers } from "../helpers";
import { useReposData } from "../hooks/useReposData";
import CSelect from "./CSelect";
import CInput from "./CInput";
import CButton from "./CButton";

interface SidebarProps {
  fetchRepositories: (abortSignal: AbortSignal) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}
export default function Sidebar({
  fetchRepositories,
  isOpen,
  onClose,
}: SidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { loadingRepositories } = useReposData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setSearchParams((prev) => {
      prev.set(id, value);
      return prev;
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = e.target;
    setSearchParams((prev) => {
      prev.set(id, value);
      return prev;
    });
  };

  const handleClear = () => {
    searchParams.delete("minStars");
    searchParams.delete("maxStars");
    searchParams.delete("minForks");
    searchParams.delete("maxForks");
    searchParams.delete("updatedAt");
    searchParams.delete("language");
    setSearchParams(searchParams);
    fetchRepositories(new AbortController().signal);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-full max-w-sm bg-gradient-to-br from-primary-light/75 to-primary 
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        lg:sticky lg:top-5 rounded-lg p-2 px-5 lg:flex-1 flex flex-col gap-5
      `}
      >
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="text-xl font-bold text-light border-b-2 border-secondary pb-2">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-light hover:text-secondary transition-colors"
            aria-label="Close filters"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-xl font-bold text-light  items-center justify-between gap-5 border-b-2 border-secondary lg:flex hidden">
          Filters{" "}
          <button
            type="button"
            title="Clear filters"
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClear}
            disabled={
              (searchParams.get("language") === "" ||
                searchParams.get("language") === null) &&
              (searchParams.get("minStars") === "" ||
                searchParams.get("minStars") === null) &&
              (searchParams.get("maxStars") === "" ||
                searchParams.get("maxStars") === null) &&
              (searchParams.get("minForks") === "" ||
                searchParams.get("minForks") === null) &&
              (searchParams.get("maxForks") === "" ||
                searchParams.get("maxForks") === null) &&
              (searchParams.get("updatedAt") === "" ||
                searchParams.get("updatedAt") === null)
            }
          >
            <DeleteIcon />
          </button>
        </h2>

        <div className="flex  flex-col gap-2">
          <p className=" text-light border-b-2 border-secondary flex items-center justify-between gap-2">
            Languages
            {<CPUIcon className="fill-secondary" />}
          </p>
          <div className="flex  gap-2">
            <CSelect
              value={searchParams.get("language") || ""}
              className="!flex-1 !w-full"
              options={helpers.githubLanguages}
              onChange={handleSelectChange}
              id="language"
            />
          </div>
        </div>

        <div className="flex  flex-col gap-2">
          <p className=" text-light border-b-2 border-secondary flex items-center justify-between gap-2">
            Stars
            {<StarIcon className="fill-secondary" />}
          </p>
          <div className="flex items-center gap-2">
            <CInput
              type="number"
              placeholder="Min stars"
              value={searchParams.get("minStars") || ""}
              id="minStars"
              onChange={handleInputChange}
            />
            <CInput
              type="number"
              placeholder="Max stars"
              value={searchParams.get("maxStars") || ""}
              id="maxStars"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex  flex-col gap-2">
          <p className=" text-light border-b-2 border-secondary flex items-center justify-between gap-2">
            Forks
            {<ForkIcon className="fill-secondary" />}
          </p>
          <div className="flex items-center gap-2">
            <CInput
              type="number"
              placeholder="Min forks"
              value={searchParams.get("minForks") || ""}
              id="minForks"
              onChange={handleInputChange}
            />
            <CInput
              type="number"
              placeholder="Max forks"
              value={searchParams.get("maxForks") || ""}
              id="maxForks"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex  flex-col gap-2">
          <p className=" text-light border-b-2 border-secondary flex items-center justify-between gap-2">
            Last Updated
            {<ClockIcon className="fill-secondary" />}
          </p>
          <CInput
            type="date"
            placeholder="from"
            value={searchParams.get("updatedAt") || ""}
            id="updatedAt"
            onChange={handleInputChange}
            max={new Date().toISOString().split("T")[0]}
            min={
              new Date(new Date().setDate(new Date().getDate() - 20 * 365))
                .toISOString()
                .split("T")[0]
            }
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <CButton
            className="w-full rounded-lg text-sm !py-1"
            disabled={loadingRepositories}
            onClick={() => {
              fetchRepositories(new AbortController().signal);
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
          >
            Apply
          </CButton>
          <button
            type="button"
            title="Clear filters"
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed md:hidden "
            onClick={handleClear}
            disabled={
              (searchParams.get("language") === "" ||
                searchParams.get("language") === null) &&
              (searchParams.get("minStars") === "" ||
                searchParams.get("minStars") === null) &&
              (searchParams.get("maxStars") === "" ||
                searchParams.get("maxStars") === null) &&
              (searchParams.get("minForks") === "" ||
                searchParams.get("minForks") === null) &&
              (searchParams.get("maxForks") === "" ||
                searchParams.get("maxForks") === null) &&
              (searchParams.get("updatedAt") === "" ||
                searchParams.get("updatedAt") === null)
            }
          >
            <DeleteIcon className="scale-[1.3] w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

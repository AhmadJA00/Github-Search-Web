import React from "react";
import { useSearchParams } from "react-router-dom";
import CSelect from "./CSelect";
import { useReposData } from "../hooks/useReposData";
import { useUserData } from "../hooks/useUserData";
import { NextIcon, PreviousIcon } from "./Icons";

export default function CPagination({ totalItems }: { totalItems: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadingRepositories } = useReposData();
  const { loadingRepos } = useUserData();

  const [currentPage, setCurrentPage] = React.useState(
    parseInt(searchParams.get("page") || "1")
  );
  const perPage = parseInt(searchParams.get("per_page") || "10");

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    searchParams.set("page", (currentPage - 1).toString());
    setCurrentPage(currentPage - 1);
    setSearchParams(searchParams);
  };
  const handleNextPage = () => {
    if (currentPage >= Math.ceil((totalItems || 0) / perPage)) return;
    searchParams.set("page", (currentPage + 1).toString());
    setCurrentPage(currentPage + 1);
    setSearchParams(searchParams);
  };
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("per_page", e.target.value);
    searchParams.set("page", "1");
    setCurrentPage(1);
    setSearchParams(searchParams);
  };
  return (
    <div className="text-center text-gray flex items-center justify-center gap-2">
      <div>
        <CSelect
          id="per_page"
          value={perPage.toString()}
          onChange={handlePerPageChange}
          className="!w-full"
          allowClear={false}
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "30", label: "30" },
            { value: "40", label: "40" },
            { value: "50", label: "50" },
          ]}
        />
      </div>
      <div className="text-center text-gray flex items-center justify-center gap-2">
        <button
          type="button"
          disabled={currentPage === 1 || loadingRepositories || loadingRepos}
          className="text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
          onClick={handlePreviousPage}
        >
          <PreviousIcon className="md:scale-[1.2]" />
          Previous
        </button>
        <button
          type="button"
          disabled={
            currentPage === Math.ceil((totalItems || 0) / perPage) ||
            loadingRepositories ||
            loadingRepos
          }
          className="text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
          onClick={handleNextPage}
        >
          Next
          <NextIcon className="md:scale-[1.2]" />
        </button>
      </div>
      <div className="text-center text-gray flex items-center justify-center gap-2 text-xs md:text-sm">
        <p>
          Page {currentPage} of {Math.ceil((totalItems || 0) / perPage)}
        </p>
      </div>
    </div>
  );
}

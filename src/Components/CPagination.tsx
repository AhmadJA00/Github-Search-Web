import React from "react";
import { useSearchParams } from "react-router-dom";
import CSelect from "./CSelect";

export default function CPagination({ totalItems }: { totalItems: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

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
          className="w-full"
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
          disabled={currentPage === 1}
          className="text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
          onClick={handlePreviousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill md:scale-[1.2]"
            viewBox="0 0 16 16"
          >
            <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
          </svg>
          Previous
        </button>
        <button
          type="button"
          disabled={currentPage === Math.ceil((totalItems || 0) / perPage)}
          className="text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
          onClick={handleNextPage}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-right md:scale-[1.2] "
            viewBox="0 0 16 16"
          >
            <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
          </svg>
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

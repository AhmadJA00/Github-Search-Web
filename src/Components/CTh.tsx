import React from "react";
import { useSearchParams } from "react-router-dom";

type THProps = {
  children: React.ReactNode;
  sortKey?: string;
};

const CTh: React.FC<THProps> = ({ children, sortKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");

  const handleSort = (sortKey: string) => {
    if (sortKey !== undefined) {
      let newSortOrder = "asc";

      if (currentSortBy === sortKey) {
        newSortOrder =
          currentSortOrder === "asc"
            ? "desc"
            : currentSortOrder === "desc"
            ? ""
            : "asc";
      }

      if (newSortOrder === "") {
        searchParams.delete("sortBy");
        searchParams.delete("sortOrder");
      } else {
        searchParams.set("sortBy", sortKey);
        searchParams.set("sortOrder", newSortOrder);
      }
      setSearchParams(searchParams);
    }
  };

  return (
    <th
      onClick={() => handleSort(sortKey || "")}
      className={`px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider  ${
        sortKey && "cursor-pointer"
      }`}
      data-sort-key={sortKey}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortKey && (
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className={`bi bi-arrow-up ${
                currentSortBy === sortKey && currentSortOrder === "asc"
                  ? "text-secondary"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className={`bi bi-arrow-down ${
                currentSortBy === sortKey && currentSortOrder === "desc"
                  ? "text-secondary"
                  : ""
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
              />
            </svg>
          </div>
        )}
      </span>
    </th>
  );
};

export default CTh;

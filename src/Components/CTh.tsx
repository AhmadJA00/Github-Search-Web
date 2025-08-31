import React from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "./Icons";

type THProps = {
  children: React.ReactNode;
  sortKey?: string;
};

const CTh: React.FC<THProps> = ({ children, sortKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order");

  const handleSort = (sortKey: string) => {
    if (sortKey !== undefined) {
      let newOrder = "asc";

      if (currentSort === sortKey) {
        newOrder =
          currentOrder === "asc"
            ? "desc"
            : currentOrder === "desc"
            ? ""
            : "asc";
      }

      if (newOrder === "") {
        searchParams.delete("sort");
        searchParams.delete("order");
      } else {
        searchParams.set("sort", sortKey);
        searchParams.set("order", newOrder);
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
            <ArrowUpIcon
              className={`${
                currentSort === sortKey && currentOrder === "asc"
                  ? "text-secondary"
                  : ""
              }`}
            />

            <ArrowDownIcon
              className={`${
                currentSort === sortKey && currentOrder === "desc"
                  ? "text-secondary"
                  : ""
              }`}
            />
          </div>
        )}
      </span>
    </th>
  );
};

export default CTh;

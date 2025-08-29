import React from "react";
import { useSearchParams } from "react-router-dom";

const deleteIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-trash3 fill-red-500"
    viewBox="0 0 16 16"
  >
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
  </svg>
);

export default function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    setSearchParams((prev) => {
      prev.set(id, checked.toString());
      return prev;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setSearchParams((prev) => {
      prev.set(id, value);
      return prev;
    });
  };

  return (
    <div className="flex-1 w-full bg-primary-light rounded-lg p-5 flex flex-col gap-5">
      <h2 className="text-xl font-bold text-light flex items-center justify-between gap-5 border-b-2 border-secondary">
        Filters {deleteIcon}
      </h2>

      <div className="flex gap-5">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPrivate"
            checked={searchParams.get("isPrivate") === "true"}
            onChange={handleFilterChange}
          />
          <label htmlFor="isPrivate">Private</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublic"
            checked={searchParams.get("isPublic") === "true"}
            onChange={handleFilterChange}
          />
          <label htmlFor="isPublic">Public</label>
        </div>
      </div>

      <div className="flex items-center flex-col gap-2">
        <input
          type="number"
          placeholder="Min stars"
          id="minStars"
          defaultValue={searchParams.get("minStars") || ""}
          onBlur={(e) => {
            const maxStars = parseInt(
              searchParams.get("maxStars") || "9999999"
            );
            if (parseInt(e.target.value) > maxStars) {
              return;
            }

            handleInputChange(e);
          }}
        />
        <input
          type="number"
          placeholder="Max stars"
          id="maxStars"
          defaultValue={searchParams.get("maxStars") || ""}
          onBlur={(e) => {
            const minStars = parseInt(searchParams.get("minStars") || "0");
            if (parseInt(e.target.value) < minStars) {
              return;
            }

            handleInputChange(e);
          }}
        />
      </div>
    </div>
  );
}

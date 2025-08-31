import React from "react";
import { getRepositories } from "../api";
import { useSearchParams } from "react-router-dom";
import CPagination from "../Components/CPagination";
import RepositoryTable from "../Components/RepositoryTable";
import RepositoryTableSkeleton from "../Components/Loading Skeleton/RepositoryTableSkeleton";
import { useReposData } from "../hooks/useReposData";
import Sidebar from "../Components/Sidebar";
import notFoundVector from "../assets/notFoundVector.png";
import CButton from "../Components/CButton";
import { FilterIcon } from "../Components/Icons";
import CSelect from "../Components/CSelect";
import RepoCardSkeleton from "../Components/Loading Skeleton/RepoCardSkeleton";

export default function Repositories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const search = searchParams.get("search");
  const {
    repositories,
    setRepositories,
    loadingRepositories,
    setLoadingRepositories,
  } = useReposData();

  const fetchRepositories = async (abortSignal: AbortSignal) => {
    try {
      if (!search) return;
      setLoadingRepositories(true);
      const data = await getRepositories(search, abortSignal);
      setRepositories(data);
    } catch (error) {
      setRepositories(null);
      console.error("Error fetching repositories:", error);
    } finally {
      setLoadingRepositories(false);
    }
  };

  React.useEffect(() => {
    const abortController = new AbortController();

    if (search) {
      fetchRepositories(abortController.signal);
    } else {
      setRepositories(null);
    }

    return () => {
      abortController.abort();
    };
  }, [
    search,
    searchParams.get("page"),
    searchParams.get("per_page"),
    searchParams.get("sort"),
    searchParams.get("order"),
    searchParams.get("searchBy"),
  ]);

  return (
    <div className="flex items-start gap-5 mb-20">
      <CButton
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-5 left-5 right-5 z-30 rounded-lg"
      >
        <FilterIcon />
        Filters
      </CButton>

      <Sidebar
        fetchRepositories={fetchRepositories}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="text-center  mx-auto flex-4 w-full space-y-5 ">
        <div className="flex items-center justify-between flex-row-reverse md:flex-row border-b border-secondary pb-1">
          <div className="flex  items-center gap-2">
            <h2 className="text-sm font-bold text-light">Search By</h2>
            <CSelect
              value={searchParams.get("searchBy") || "user"}
              id="searchBy"
              allowClear={false}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                searchParams.set("searchBy", e.target.value);
                setSearchParams(searchParams);
              }}
              options={[
                { label: "Users", value: "users" },
                { label: "Repositories", value: "repos" },
                { label: "Organizations", value: "orgs" },
              ]}
            />
          </div>
          <h2 className="text-sm md:text-xl font-bold text-light">
            Repositories ({repositories?.total_count || 0})
          </h2>
        </div>
        {!loadingRepositories &&
        (!repositories || repositories.total_count === 0) ? (
          <div className="text-center py-12 mx-auto flex-4 w-full space-y-5">
            {search && (
              <img
                src={notFoundVector}
                alt="No Repositories found"
                className="w-96 mx-auto"
              />
            )}
            <h3 className="text-lg font-medium text-light mb-2">
              No Repositories found
            </h3>
            <p className="text-gray text-center text-sm md:text-base">
              {search
                ? `No Repositories found for "${search}"`
                : "Search for Repositories to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-5 flex-4 w-full">
            {loadingRepositories ? (
              <>
                <span className="hidden md:block">
                  <RepositoryTableSkeleton />
                </span>
                <span className="block md:hidden">
                  <RepoCardSkeleton />
                </span>
              </>
            ) : (
              <RepositoryTable repositories={repositories?.items || []} />
            )}

            {repositories?.total_count && repositories?.total_count > 0 && (
              <CPagination totalItems={repositories?.total_count || 0} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

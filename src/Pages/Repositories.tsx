import React from "react";
import { getAllRepositories } from "../api";
import { useSearchParams } from "react-router-dom";
import CPagination from "../Components/CPagination";
import RepositoryTable from "../Components/RepositoryTable";
import RepositoryTableSkeleton from "../Components/Loading Skeleton/RepositoryTableSkeleton";
import { useReposData } from "../hooks/useReposData";
import Sidebar from "../Components/Sidebar";
import CButton from "../Components/CButton";
import { FilterIcon } from "../Components/Icons";

export default function Repositories() {
  const [searchParams] = useSearchParams();
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
      const data = await getAllRepositories(search, abortSignal);
      setRepositories(data);
    } catch (error) {
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
    searchParams.get("sortBy"),
    searchParams.get("sortOrder"),
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

      {!loadingRepositories &&
      (!repositories || repositories.total_count === 0) ? (
        <div className="text-center py-12 flex-5 w-full">
          <h3 className="text-lg font-medium text-light mb-2">
            No repositories found
          </h3>
          <p className="text-gray">
            {search
              ? `No repositories found for "${search}"`
              : "Search for repositories to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-5 flex-5 w-full">
          <h2 className="text-2xl font-bold text-light">
            Repositories ({repositories?.total_count || 0})
          </h2>

          {loadingRepositories ? (
            <RepositoryTableSkeleton count={8} />
          ) : (
            <RepositoryTable repositories={repositories?.items || []} />
          )}

          {repositories?.total_count && repositories?.total_count > 0 && (
            <CPagination totalItems={repositories?.total_count || 0} />
          )}
        </div>
      )}
    </div>
  );
}

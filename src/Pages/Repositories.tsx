import React from "react";
import { getAllRepositories } from "../api";
import { useSearchParams } from "react-router-dom";
import CPagination from "../Components/CPagination";
import RepositoryTable from "../Components/RepositoryTable";
import RepositoryTableSkeleton from "../Components/Loading Skeleton/RepositoryTableSkeleton";
import type { GitHubSearchResponse } from "../types";

export default function Repositories() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const [repositories, setRepositories] =
    React.useState<GitHubSearchResponse | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const data = await getAllRepositories();
      setRepositories(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (search) {
      fetchRepositories();
    } else {
      setRepositories(null);
    }
  }, [
    search,
    searchParams.get("page"),
    searchParams.get("per_page"),
    searchParams.get("sortBy"),
    searchParams.get("sortOrder"),
  ]);

  if (!loading && (!repositories || repositories.total_count === 0)) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-light mb-2">
          No repositories found
        </h3>
        <p className="text-gray">
          {search
            ? `No repositories found for "${search}"`
            : "Search for repositories to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-light">
          Repositories ({repositories?.total_count || 0})
        </h2>
      </div>

      {loading ? (
        <RepositoryTableSkeleton count={8} />
      ) : (
        <RepositoryTable repositories={repositories?.items || []} />
      )}

      {repositories?.total_count && repositories?.total_count > 0 && (
        <CPagination totalItems={repositories?.total_count || 0} />
      )}
    </div>
  );
}

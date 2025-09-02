import React, { useEffect } from "react";
import { AbortedDeferredError, useSearchParams } from "react-router-dom";
import { getUser, getRepos } from "../api";
import { useUserData } from "../hooks/useUserData";
import type { GitHubUser } from "../types";
import { helpers } from "../helpers";
import UserProfileSkeleton from "../Components/Loading Skeleton/UserProfileSkeleton";
import UserDataCard from "../Components/UserDataCard";

import CPagination from "../Components/CPagination";
import UserRepoCard from "../Components/UserReposCard";
import UserRepoCardSkeleton from "../Components/Loading Skeleton/UserRepoCardSkeleton";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const {
    user,
    repos,
    loading,
    loadingRepos,
    setUser,
    setRepos,
    setLoading,
    setLoadingRepos,
  } = useUserData();

  const fetchRepos = React.useCallback(
    async (userData: GitHubUser, abortSignal?: AbortSignal) => {
      try {
        setLoadingRepos(true);
        const reposData = await getRepos(`${userData.repos_url}`, abortSignal);

        const reposStorageKey = `${search || "AhmadJA00"}_repos_perPage_${
          per_page || "10"
        }_page_${page || "1"}`;

        helpers.storeUserDataInLocalStorage(reposStorageKey, reposData);
        setRepos(reposData);
      } catch (error) {
        if (error instanceof AbortedDeferredError) {
          console.error(error);
        } else {
          console.error("Failed to fetch repositories:", error);
        }
      } finally {
        setLoadingRepos(false);
      }
    },
    [search, per_page, page, setRepos, setLoadingRepos]
  );

  const fetchData = React.useCallback(
    async (abortSignal?: AbortSignal) => {
      try {
        setLoading(true);
        setUser(null);
        setRepos(null);

        const userStorageKey = `${search || "AhmadJA00"}_data`;
        const reposStorageKey = `${search || "AhmadJA00"}_repos_perPage_${
          per_page || "10"
        }_page_${page || "1"}`;

        const catchedUser = helpers.getDataFromLocalStorage(userStorageKey);
        const catchedRepos = helpers.getDataFromLocalStorage(reposStorageKey);

        if (catchedUser) {
          setUser(catchedUser);
          if (catchedRepos) {
            setRepos(catchedRepos);
          } else {
            fetchRepos(catchedUser, abortSignal);
          }
          return;
        }

        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("page", "1");
        newSearchParams.set("per_page", "10");
        setSearchParams(newSearchParams);

        const userData = await getUser(search || "", abortSignal);

        setUser(userData);

        helpers.storeUserDataInLocalStorage(userStorageKey, userData);
        fetchRepos(userData, abortSignal);
      } catch (error) {
        if (error instanceof AbortedDeferredError) {
          console.error(error);
        } else {
          console.error("Failed to fetch user data:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [
      search,
      page,
      per_page,
      setUser,
      setRepos,
      setLoading,
      fetchRepos,
      setSearchParams,
    ]
  );
  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [page, per_page, search]);

  if (!loading && !loadingRepos && !user) {
    return (
      <div className="text-center py-12 mx-auto space-y-5">
        <h3 className="text-lg font-medium text-light mb-2">No User found</h3>
        <p className="text-gray text-center text-sm md:text-base">
          {search
            ? `No User found for "${search}"`
            : "Search for User to get started"}
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      {loading ? (
        <UserProfileSkeleton />
      ) : (
        user?.id && <UserDataCard user={user} />
      )}

      {loadingRepos ? (
        <UserRepoCardSkeleton />
      ) : (
        <>
          {repos?.length && repos.length > 0 ? (
            <>
              <div className="flex items-center md:items-start justify-between md:flex-col gap-2">
                <h2 className="text-2xl font-bold">Repositories</h2>
                <p className="text-sm text-gray">
                  {user?.public_repos} repositories found
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                {repos?.map((repo) => (
                  <UserRepoCard repo={repo} key={repo.id} />
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-2xl font-bold">No repositories found</h2>
          )}
        </>
      )}
      {repos?.length && repos.length >= 10 ? (
        <CPagination totalItems={user?.public_repos || 0} />
      ) : (
        ""
      )}
    </section>
  );
}

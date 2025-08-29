import { useEffect } from "react";
import { AbortedDeferredError, useSearchParams } from "react-router-dom";
import { getUser, getRepos } from "../api";
import { useUserData } from "../hooks/useUserData";
import UserDataCard from "../Components/UserDataCard";
import UserProfileSkeleton from "../Components/Loading Skeleton/UserProfileSkeleton";
import ReposSkeleton from "../Components/Loading Skeleton/ReposSkeleton";
import RepoCard from "../Components/RepoCard";
import CPagination from "../Components/CPagination";
import type { GitHubUser } from "../types";
import { helpers } from "../helpers";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
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

  const fetchRepos = async (
    userData: GitHubUser,
    abortSignal?: AbortSignal
  ) => {
    try {
      setLoadingRepos(true);
      const reposData = await getRepos(userData.repos_url, abortSignal);
      setRepos(reposData);
    } catch (error) {
      if (error instanceof AbortedDeferredError) {
        console.error(error);
      }
    } finally {
      setLoadingRepos(false);
    }
  };

  const fetchData = async (abortSignal?: AbortSignal) => {
    try {
      setUser(null);
      setRepos(null);
      setLoading(true);

      const catchedUser = helpers.getDataFromLocalStorage(
        `${search || "AhmadJA00"}_data`
      );
      if (catchedUser) {
        setUser(catchedUser);
        fetchRepos(catchedUser, abortSignal);
        return;
      }
      searchParams.set("page", "1");
      searchParams.set("per_page", "10");
      setSearchParams(searchParams);
      const userData = await getUser(search || "", abortSignal);
      helpers.storeUserDataInLocalStorage(
        `${search || "AhmadJA00"}_data`,
        userData
      );
      fetchRepos(userData, abortSignal);
      setUser(userData);
    } catch (error) {
      if (error instanceof AbortedDeferredError) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetchData(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [searchParams.get("page"), searchParams.get("per_page"), search]);

  // useEffect(() => {
  //   if (user?.public_repos) {
  //     const abortController = new AbortController();

  //     fetchRepos(user, abortController.signal);

  //     return () => {
  //       abortController.abort();
  //     };
  //   }
  // }, [searchParams.get("page"), searchParams.get("per_page")]);

  if (!loading && !user) {
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
    <section className="flex flex-col gap-5">
      {loading ? (
        <UserProfileSkeleton />
      ) : (
        user?.id && <UserDataCard user={user} />
      )}

      {loadingRepos ? (
        <ReposSkeleton count={4} />
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
                  <RepoCard repo={repo} key={repo.id} />
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

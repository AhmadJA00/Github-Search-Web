import { useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { getUser, getRepos } from "../api";
import { useUserData } from "../hooks/useUserData";
import UserDataCard from "../Components/UserDataCard";
import UserProfileSkeleton from "../Components/Loading Skeleton/UserProfileSkeleton";
import ReposSkeleton from "../Components/Loading Skeleton/ReposSkeleton";
import RepoCard from "../Components/RepoCard";
import CPagination from "../Components/CPagination";

export default function Home() {
  const [searchParams] = useSearchParams();
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

  const fetchRepos = async () => {
    try {
      setLoadingRepos(true);
      const reposData = await getRepos(user?.repos_url || "");
      setRepos(reposData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRepos(false);
    }
  };

  const fetchData = async () => {
    try {
      setUser(null);
      setRepos(null);
      setLoading(true);
      const userData = await getUser(search || "");
      setUser(userData);

      const reposData = await getRepos(userData.repos_url);
      setRepos(reposData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    if (user?.public_repos) {
      fetchRepos();
    }
  }, [searchParams.get("page"), searchParams.get("per_page")]);

  return (
    <section className="flex flex-col gap-5 p-5">
      <SearchBar />
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
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Repositories</h2>
              <p className="text-sm text-gray">
                {user?.public_repos} repositories found
              </p>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">No repositories found</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            {repos?.map((repo) => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
          </div>
        </>
      )}
      {repos?.length && repos.length >= 10 && <CPagination />}
    </section>
  );
}

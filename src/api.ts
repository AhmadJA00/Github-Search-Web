import { HTTP } from "./axios";
import { helpers } from "./helpers";
import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUser,
  queryOBJType,
} from "./types";

export async function getUser(
  username?: string,
  signal?: AbortSignal
): Promise<GitHubUser> {
  try {
    let url = `/user`;
    if (username) {
      url = `/users/${username}`;
    }
    const response = await HTTP.get<GitHubUser>(url, {
      signal,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getRepos(
  repos_url: string,
  signal?: AbortSignal
): Promise<GitHubRepository[]> {
  const searchParams = new URLSearchParams(window.location.search);
  const queryOBJ: queryOBJType = {
    page: searchParams.get("page") || "1",
    per_page: searchParams.get("per_page") || "10",
  };
  const urlSearchParams = helpers.queryValidation(queryOBJ);

  try {
    const response = await HTTP.get<GitHubRepository[]>(
      `${repos_url}?${urlSearchParams.toString()}`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllRepositories(
  username?: string,
  signal?: AbortSignal
): Promise<GitHubSearchResponse> {
  const searchParams = new URLSearchParams(window.location.search);

  const searchBy = searchParams.get("searchBy");
  const minStars = searchParams.get("minStars");
  const maxStars = searchParams.get("maxStars");
  const minForks = searchParams.get("minForks");
  const maxForks = searchParams.get("maxForks");
  const updatedAt = searchParams.get("updatedAt");
  const language = searchParams.get("language");

  let query = ``;

  if (searchBy === "repos") {
    query += `${username}`;
  } else if (searchBy === "orgs") {
    query += `org:${username}`;
  } else {
    query += `user:${username}`;
  }

  if (minStars && !maxStars) {
    query += ` stars:>=${minStars}`;
  }

  if (maxStars && !minStars) {
    query += ` stars:<=${maxStars}`;
  }

  if (minStars && maxStars) {
    query += ` stars:${minStars}..${maxStars}`;
  }

  if (minForks && !maxForks) {
    query += ` forks:>=${minForks}`;
  }

  if (maxForks && !minForks) {
    query += ` forks:<=${maxForks}`;
  }

  if (minForks && maxForks) {
    query += ` forks:${minForks}..${maxForks}`;
  }

  if (updatedAt) {
    query += ` pushed:>=${updatedAt}`;
  }

  if (language) {
    query += ` language:${language}`;
  }

  const queryOBJ: queryOBJType = {
    page: searchParams.get("page") || "1",
    per_page: searchParams.get("per_page") || "10",
    q: query,
    sort: searchParams.get("sortBy") || "",
    order: searchParams.get("sortOrder") || "",
  };

  const urlSearchParams = helpers.queryValidation(queryOBJ);

  try {
    const response = await HTTP.get<GitHubSearchResponse>(
      `search/repositories?${urlSearchParams.toString()}`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

import { HTTP } from "./axios";
import { helpers } from "./helpers";
import type {
  GitHubRepository,
  GitHubSearchResponse,
  GitHubUser,
  queryOBJType,
} from "./types";

export async function getUser(username?: string): Promise<GitHubUser> {
  try {
    let url = `/user`;
    if (username) {
      url = `/users/${username}`;
    }
    const response = await HTTP.get<GitHubUser>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getRepos(repos_url: string): Promise<GitHubRepository[]> {
  const queryOBJ: queryOBJType = {
    page: new URLSearchParams(window.location.search).get("page") || "1",
    per_page:
      new URLSearchParams(window.location.search).get("per_page") || "10",
  };
  const urlSearchParams = helpers.queryValidation(queryOBJ);

  try {
    const response = await HTTP.get<GitHubRepository[]>(
      `${repos_url}?${urlSearchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function getAllRepositories(
//   username: string
// ): Promise<GitHubSearchResponse> {
//   const queryOBJ: queryOBJType = {
//     page: new URLSearchParams(window.location.search).get("page") || "1",
//     per_page:
//       new URLSearchParams(window.location.search).get("per_page") || "10",
//     sort: new URLSearchParams(window.location.search).get("sortBy") || "",
//     order: new URLSearchParams(window.location.search).get("sortOrder") || "",
//   };

//   const urlSearchParams = helpers.queryValidation(queryOBJ);

//   try {
//     const response = await HTTP.get<GitHubSearchResponse>(
//       `/users/${username}/repos?${urlSearchParams.toString()}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
export async function getAllRepositories(): Promise<GitHubSearchResponse> {
  const queryOBJ: queryOBJType = {
    page: new URLSearchParams(window.location.search).get("page") || "1",
    per_page:
      new URLSearchParams(window.location.search).get("per_page") || "10",
    q: new URLSearchParams(window.location.search).get("search") || "",
    sort: new URLSearchParams(window.location.search).get("sortBy") || "",
    order: new URLSearchParams(window.location.search).get("sortOrder") || "",
  };

  const urlSearchParams = helpers.queryValidation(queryOBJ);

  try {
    const response = await HTTP.get<GitHubSearchResponse>(
      `search/repositories?${urlSearchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

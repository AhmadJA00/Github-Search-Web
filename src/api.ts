import { HTTP } from "./axios";
import { helpers } from "./helpers";
import type { GitHubRepository, GitHubUser, queryOBJType } from "./types";

export async function getUser(username: string): Promise<GitHubUser> {
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
    q:
      new URLSearchParams(window.location.search).get("q") ||
      "Color-Guessing-Game",
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

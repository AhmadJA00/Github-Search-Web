import type { GitHubRepository, GitHubUser, queryOBJType } from "./types";

export const helpers = {
  queryValidation: (queryOBJ: queryOBJType) => {
    const { page, per_page, search, q, sort, order, isPublic } = queryOBJ;

    const urlSearchParams = new URLSearchParams();

    if (
      page !== null &&
      page !== undefined &&
      parseInt(page) > 0 &&
      !isNaN(parseInt(page))
    ) {
      urlSearchParams.set("page", page);
    }

    if (
      per_page !== null &&
      per_page !== undefined &&
      parseInt(per_page) > 0 &&
      !isNaN(parseInt(per_page))
    ) {
      urlSearchParams.set("per_page", per_page);
    }

    if (search !== null && search !== undefined && search !== "") {
      urlSearchParams.set("search", search);
    }
    if (q !== null && q !== undefined && q !== "") {
      urlSearchParams.set("q", q);
    }
    if (sort !== null && sort !== undefined && sort !== "") {
      urlSearchParams.set("sort", sort);
    }
    if (order !== null && order !== undefined && order !== "") {
      urlSearchParams.set("order", order);
    }

    return urlSearchParams;
  },

  storeUserDataInLocalStorage: (
    key: string,
    data: GitHubUser | GitHubRepository[]
  ) => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ data, storedDate: new Date().toISOString() })
      );
      console.log("data stored in local storage");
    } catch (error) {
      console.error(error);
    }
  },

  getDataFromLocalStorage: (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    const parsedData = JSON.parse(data);
    if (
      new Date(parsedData.storedDate) < new Date(Date.now() - 1000 * 60 * 60)
    ) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedData.data;
  },
};

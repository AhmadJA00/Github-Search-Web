import type { queryOBJType } from "./types";

export const helpers = {
  queryValidation: (queryOBJ: queryOBJType) => {
    const { page, per_page } = queryOBJ;

    const urlSearchParams = new URLSearchParams();

    if (page !== null && page !== undefined && page !== "") {
      urlSearchParams.set("page", page);
    }

    if (per_page !== null && per_page !== undefined && per_page !== "") {
      urlSearchParams.set("per_page", per_page);
    }

    // if (search !== null && search !== undefined && search !== "") {
    //   urlSearchParams.set("search", search);
    // }

    return urlSearchParams;
  },
};

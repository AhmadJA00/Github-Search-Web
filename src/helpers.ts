import type { queryOBJType } from "./types";

export const helpers = {
  queryValidation: (queryOBJ: queryOBJType) => {
    const { page, per_page, search, q } = queryOBJ;

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

    return urlSearchParams;
  },
};

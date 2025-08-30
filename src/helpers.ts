import type { GitHubRepository, GitHubUser, queryOBJType } from "./types";

export const helpers = {
  queryValidation: (queryOBJ: queryOBJType) => {
    const { page, per_page, search, q, sort, order } = queryOBJ;

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

  githubLanguages: [
    { value: "", label: "Select Language" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "c++", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "rust", label: "Rust" },
    { value: "scala", label: "Scala" },
    { value: "dart", label: "Dart" },
    { value: "elixir", label: "Elixir" },
    { value: "clojure", label: "Clojure" },
    { value: "haskell", label: "Haskell" },
    { value: "lua", label: "Lua" },
    { value: "perl", label: "Perl" },
    { value: "r", label: "R" },
    { value: "shell", label: "Shell" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "vue", label: "Vue" },
    { value: "sass", label: "SASS" },
    { value: "less", label: "LESS" },
    { value: "julia", label: "Julia" },
    { value: "dart", label: "Dart" },
    { value: "rust", label: "Rust" },
  ],
};

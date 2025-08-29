import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GitHubSearchResponse } from "../types";

interface ReposDataContextType {
  repositories: GitHubSearchResponse | null;
  loadingRepositories: boolean;
  setRepositories: (repos: GitHubSearchResponse | null) => void;
  setLoadingRepositories: (loading: boolean) => void;
}

const ReposDataContext = createContext<ReposDataContextType | undefined>(
  undefined
);

interface ReposDataProviderProps {
  children: ReactNode;
}

export const ReposDataProvider: React.FC<ReposDataProviderProps> = ({
  children,
}) => {
  const [repositories, setRepositories] = useState<GitHubSearchResponse | null>(
    null
  );
  const [loadingRepositories, setLoadingRepositories] = useState(false);

  const value: ReposDataContextType = {
    repositories,
    loadingRepositories,
    setRepositories,
    setLoadingRepositories,
  };

  return (
    <ReposDataContext.Provider value={value}>
      {children}
    </ReposDataContext.Provider>
  );
};

export const useReposData = (): ReposDataContextType => {
  const context = useContext(ReposDataContext);
  if (context === undefined) {
    throw new Error("useReposData must be used within a ReposDataProvider");
  }
  return context;
};

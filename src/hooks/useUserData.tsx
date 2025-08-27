import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GitHubUser, GitHubRepository } from "../types";

interface UserDataContextType {
  user: GitHubUser | null;
  repos: GitHubRepository[] | null;
  loading: boolean;
  loadingRepos: boolean;
  setUser: (user: GitHubUser | null) => void;
  setRepos: (repos: GitHubRepository[] | null) => void;
  setLoading: (loading: boolean) => void;
  setLoadingRepos: (loading: boolean) => void;
  clearUserData: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepository[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const clearUserData = () => {
    setUser(null);
    setRepos(null);
    setLoading(false);
  };

  const value: UserDataContextType = {
    user,
    repos,
    loading,
    loadingRepos,
    setUser,
    setRepos,
    setLoading,
    setLoadingRepos,
    clearUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

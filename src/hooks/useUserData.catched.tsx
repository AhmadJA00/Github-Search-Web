// import React, { createContext, useContext, useState } from "react";
// import type { ReactNode } from "react";
// import type { GitHubUser, GitHubRepository } from "../types";
// import { getRepos, getUser } from "../api";
// import { helpers } from "../helpers";

// interface UserDataContextType {
//   user: GitHubUser | null;
//   repos: GitHubRepository[] | null;
//   loading: boolean;
//   loadingRepos: boolean;
//   setUserData: (search: string) => void;
//   clearUserData: () => void;
// }

// const UserDataContext = createContext<UserDataContextType | undefined>(
//   undefined
// );

// interface UserDataProviderProps {
//   children: ReactNode;
// }

// export const UserDataProvider: React.FC<UserDataProviderProps> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<GitHubUser | null>(null);
//   const [repos, setRepos] = useState<GitHubRepository[] | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [loadingRepos, setLoadingRepos] = useState(false);

//   const fetchCurrnetUserRepos = async (userData: GitHubUser) => {
//     try {
//       setLoadingRepos(true);
//       const reposData = await getRepos(userData.repos_url);
//       setRepos(reposData);
//       helpers.storeUserDataInLocalStorage(`${userData.login}_repos`, reposData);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingRepos(false);
//     }
//   };

//   const fetchCurrentUserData = async (search?: string) => {
//     try {
//       setUser(null);
//       setRepos(null);
//       setLoading(true);
//       const userData = await getUser(search);
//       setUser(userData);
//       helpers.storeUserDataInLocalStorage(`${userData.login}_data`, userData);

//       const cachedRepos = helpers.getDataFromLocalStorage(
//         `${userData.login}_repos`
//       );
//       if (cachedRepos) {
//         setRepos(cachedRepos);
//       } else {
//         fetchCurrnetUserRepos(userData);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setUserData = async (search: string) => {
//     try {
//       if (search) {
//         const cachedData = helpers.getDataFromLocalStorage(`${search}_data`);
//         const cachedRepos = helpers.getDataFromLocalStorage(`${search}_repos`);
//         if (cachedData) {
//           setUser(cachedData);
//         } else {
//           await fetchCurrentUserData(search);
//         }

//         if (cachedRepos) {
//           setRepos(cachedRepos);
//         } else {
//           await fetchCurrnetUserRepos(cachedData);
//         }
//       } else {
//         const cachedData = helpers.getDataFromLocalStorage(`AhmadJA00_data`);
//         const cachedRepos = helpers.getDataFromLocalStorage(`AhmadJA00_repos`);
//         if (cachedData) {
//           setUser(cachedData);
//         } else {
//           await fetchCurrentUserData();
//         }

//         if (cachedRepos) {
//           setRepos(cachedRepos);
//         } else {
//           await fetchCurrnetUserRepos(cachedData);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const clearUserData = () => {
//     setUser(null);
//     setRepos(null);
//     setLoading(false);
//   };

//   const value: UserDataContextType = {
//     user,
//     repos,
//     loading,
//     loadingRepos,
//     setUserData,
//     clearUserData,
//   };

//   return (
//     <UserDataContext.Provider value={value}>
//       {children}
//     </UserDataContext.Provider>
//   );
// };

// export const useUserData = (): UserDataContextType => {
//   const context = useContext(UserDataContext);
//   if (context === undefined) {
//     throw new Error("useUserData must be used within a UserDataProvider");
//   }
//   return context;
// };

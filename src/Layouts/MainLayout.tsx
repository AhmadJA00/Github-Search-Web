import { Outlet } from "react-router";
import { UserDataProvider } from "../hooks/useUserData";
import { ReposDataProvider } from "../hooks/useReposData";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <UserDataProvider>
      <ReposDataProvider>
        <div className="min-h-screen relative bg-github-gradient ">
          <div className="max-w-7xl mx-auto p-5 flex flex-col gap-5">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </ReposDataProvider>
    </UserDataProvider>
  );
}

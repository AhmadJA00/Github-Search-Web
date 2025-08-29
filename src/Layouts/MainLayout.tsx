import { Outlet } from "react-router";
import { UserDataProvider } from "../hooks/useUserData";
import Navbar from "../Components/Navbar";

export default function MainLayout() {
  return (
    <UserDataProvider>
      <div>
        <div className="max-w-6xl mx-auto p-5 flex flex-col gap-5">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </UserDataProvider>
  );
}

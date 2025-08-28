import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <div className="max-w-5xl mx-auto ">
        <Outlet />
      </div>
    </div>
  );
}

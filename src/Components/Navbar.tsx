import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const pages = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Repositories",
      path: "/repositories",
    },
  ];

  return (
    <nav className=" bg-primary-light rounded-lg p-1 md:py-3 md:px-5 flex items-center justify-between gap-2 md:gap-5">
      <SearchBar className="flex-2 md:flex-3" />
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-5">
        {pages.map((page) => (
          <Link
            to={page.path}
            key={page.name}
            className={`border-b-2  text-xs md:text-base ${
              pathname === page.path
                ? "border-secondary"
                : "border-transparent hover:border-secondary/50 duration-200"
            }`}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

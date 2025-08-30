import React from "react";
import type { GitHubUser } from "../types";
const PeopleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-people-fill fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 14 14"
  >
    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
  </svg>
);
const BuildingIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-building fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 16 16"
  >
    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
  </svg>
);

const LocationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-geo-alt fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 16 16"
  >
    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
  </svg>
);

const EmailIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-envelope fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 16 16"
  >
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
  </svg>
);

const PublicRepoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-book-half fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 16 16"
  >
    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
  </svg>
);

const PrivateRepoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    className="bi bi-journal-bookmark fill-secondary scale-[0.8] md:scale-[1.2]"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8"
    />
    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
  </svg>
);

type UserCardProps = {
  user: GitHubUser;
};

const UserDataCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="border border-gray/30 hover:border-secondary transition-colors duration-200 backdrop-blur-xl rounded-lg">
      <div className="p-2 md:p-5 flex flex-col md:flex-row gap-5">
        <img
          className="w-28 md:w-40 h-28 md:h-40 rounded-full mx-auto md:mx-0"
          src={user.avatar_url}
          alt={user.name || user.login}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 gap-x-3 md:gap-x-5">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-3xl text-center md:text-left font-bold col-span-2 md:col-span-3 underline underline-offset-4 hover:no-underline"
          >
            {user.name}
          </a>
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base text-gray col-span-2 md:col-span-3 ">
            <p>{user.bio}</p>
            <span className="text-secondary">•</span>
            <p>{user.login}</p>
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray">
            {PeopleIcon}
            <p>{user.followers} followers</p>
            <span className="text-secondary">•</span>
            <p>{user.following} following</p>
          </div>

          <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray">
            {BuildingIcon}

            {user.company && user.company.startsWith("@") ? (
              <a
                href={`https://github.com/${user.company.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-200"
              >
                {user.company}
              </a>
            ) : (
              <p>{user.company}</p>
            )}
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray">
            {LocationIcon}
            <p>{user.location}</p>
          </div>
          {user?.email && (
            <a
              href={`mailto:${user.email}`}
              className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray"
            >
              {EmailIcon}
              <p>{user.email}</p>
            </a>
          )}
          {user.public_repos > 0 && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray">
              {PublicRepoIcon}
              <p> {user.public_repos} public repositories</p>
            </div>
          )}
          {user.total_private_repos > 0 && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] md:text-base text-gray">
              {PrivateRepoIcon}
              <p> {user.total_private_repos} private repositories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDataCard;

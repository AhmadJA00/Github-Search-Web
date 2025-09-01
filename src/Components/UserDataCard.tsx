import React, { memo } from "react";
import type { GitHubUser } from "../types";
import {
  BuildingIcon,
  EmailIcon,
  LocationIcon,
  PeopleIcon,
  PrivateRepoIcon,
  PublicRepoIcon,
} from "./Icons";

type UserCardProps = {
  user: GitHubUser;
};

const UserDataCard: React.FC<UserCardProps> = memo(({ user }) => {
  return (
    <div className="border border-gray/30 hover:border-secondary transition-colors duration-200 backdrop-blur-xl rounded-lg">
      <div className="p-2 md:p-5 flex flex-col md:flex-row gap-2 md:gap-5 ">
        <img
          className="w-20 md:w-32 lg:w-40 h-20 md:h-32 lg:h-40 rounded-full mx-auto md:mx-0"
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
          <div className="flex flex-col-reverse lg:flex-row text-center md:text-justify items-center md:items-start lg:items-center justify-center md:justify-start lg:gap-2 text-sm lg:text-base text-gray col-span-2 md:col-span-3 ">
            <p>{user.bio}</p>
            <span className="text-secondary hidden lg:block">•</span>
            <p>{user.login}</p>
          </div>
          <div className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray">
            {
              <PeopleIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
            }
            <p>{user.followers} followers</p>
            <span className="text-secondary">•</span>
            <p>{user.following} following</p>
          </div>

          {user.company && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray">
              {
                <BuildingIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
              }

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
          )}
          {user.location && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray">
              {
                <LocationIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
              }
              <p>{user.location}</p>
            </div>
          )}
          {user?.email && (
            <a
              href={`mailto:${user.email}`}
              className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray"
            >
              {
                <EmailIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
              }
              <p>{user.email}</p>
            </a>
          )}
          {user.public_repos > 0 && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray">
              {
                <PublicRepoIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
              }
              <p> {user.public_repos} public repositories</p>
            </div>
          )}
          {user.total_private_repos > 0 && (
            <div className="flex items-center gap-1 md:gap-3 text-[10px] lg:text-base text-gray">
              {
                <PrivateRepoIcon className="scale-[0.8] md:scale-[1.2] fill-secondary" />
              }
              <p> {user.total_private_repos} private repositories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default UserDataCard;

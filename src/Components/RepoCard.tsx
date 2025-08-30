import React, { useState } from "react";
import type { GitHubRepository } from "../types";
import { ClockIcon, ForkIcon, IssueIcon, StarIcon } from "./Icons";

interface RepoCardProps {
  repo: GitHubRepository;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = repo.description?.trim() || "No description available";
  const shouldShowReadMore = description.length > 60;
  const displayText = isExpanded ? description : description.slice(0, 60);

  return (
    <div className="border border-gray rounded-lg p-2 md:p-5 hover:border-secondary transition-colors duration-200 group backdrop-blur md:backdrop-blur-3xl">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="md:text-lg font-semibold text-white ">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover:text-secondary transition-colors duration-200"
              >
                {repo.name}
              </a>
            </h3>
            <div className="text-xs md:text-sm text-gray">
              <p>{repo.full_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
            <span className="flex items-center gap-1">
              <ClockIcon />
              <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                repo.private
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {repo.private ? "Private" : "Public"}
            </span>
          </div>
        </div>

        <div className="text-xs md:text-sm text-gray flex items-center flex-wrap gap-1 ">
          <p className="text-justify ">
            {displayText}
            {shouldShowReadMore && !isExpanded && description.length > 60 && (
              <span className="text-secondary">...</span>
            )}
          </p>
          {shouldShowReadMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-secondary hover:text-white transition-colors duration-200 text-xs md:text-sm "
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs md:text-sm text-gray">
          {repo.language && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            {<StarIcon />}
            <span>{repo.stargazers_count} stars</span>
          </div>
          <div className="flex items-center gap-1">
            {<ForkIcon />}
            <span>{repo.forks_count} forks</span>
          </div>
          <div className="flex items-center gap-1">
            {<IssueIcon />}
            <span>{repo.open_issues_count} issues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;

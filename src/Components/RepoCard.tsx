import React, { useState } from "react";
import type { GitHubRepository } from "../types";

interface RepoCardProps {
  repo: GitHubRepository;
}

const StarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-star-half fill-secondary"
    viewBox="0 0 16 16"
  >
    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
  </svg>
);

const ForkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-star-half fill-secondary"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const IssueIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    className="bi bi-info-lg fill-secondary"
    viewBox="0 0 16 16"
  >
    <path d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0" />
  </svg>
);
const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const description = repo.description?.trim() || "No description available";
  const shouldShowReadMore = description.length > 60;
  const displayText = isExpanded ? description : description.slice(0, 60);

  return (
    <div className="border border-gray rounded-lg p-2 md:p-5 hover:border-secondary transition-colors duration-200 group">
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
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
            {StarIcon}
            <span>{repo.stargazers_count} stars</span>
          </div>
          <div className="flex items-center gap-1">
            {ForkIcon}
            <span>{repo.forks_count} forks</span>
          </div>
          <div className="flex items-center gap-1">
            {IssueIcon}
            <span>{repo.open_issues_count} issues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;

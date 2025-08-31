import React, { memo } from "react";
import type { GitHubRepository } from "../types";

interface RepoCardProps {
  repo: GitHubRepository;
}

const RepoCard: React.FC<RepoCardProps> = memo(({ repo }) => {
  return (
    <div
      key={repo.id}
      onClick={() => {
        window.open(repo.html_url, "_blank");
      }}
      className="border border-gray/30 rounded-lg p-2 md:p-5 hover:border-secondary transition-colors duration-200 group backdrop-blur md:backdrop-blur-xl"
    >
      <div className="flex items-start justify-between mb-3 text-start">
        <div className="flex items-center space-x-3">
          <img
            className="h-8 w-8 rounded-full"
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
          />
          <div>
            <h3 className="text-sm font-medium text-light">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-200 underline underline-offset-4 hover:no-underline"
              >
                {repo.name}
              </a>
            </h3>
            <p className="text-xs text-gray/70">by {repo.owner.login}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-center text-sm">
        <div>
          <p className=" font-semibold text-light">{repo.stargazers_count}</p>
          <p className="text-gray/70 text-xs mt-1">Stars</p>
        </div>
        <div>
          <p className=" font-semibold text-light">{repo.forks_count}</p>
          <p className=" text-gray/70 text-xs mt-1">Forks</p>
        </div>
        <div>
          <p className="text-light">
            {new Date(repo.pushed_at).toLocaleDateString()}
          </p>
          <p className=" text-gray/70 text-xs mt-1">Updated</p>
        </div>
        {repo.language && (
          <div>
            <p className="bg-secondary/20 text-secondary rounded-full">
              {repo.language}{" "}
            </p>
            <p className=" text-gray/70 text-xs mt-1">Language</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default RepoCard;

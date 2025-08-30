import type { GitHubRepository } from "../types";
import CTh from "./CTh";

interface RepositoryTableProps {
  repositories: GitHubRepository[];
}

export default function RepositoryTable({
  repositories,
}: RepositoryTableProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="hidden md:block">
        <table className="min-w-full relative">
          <thead className="bg-primary-light">
            <tr>
              <CTh>Repository</CTh>
              <CTh sortKey={"language"}>Language</CTh>
              <CTh sortKey={"stars"}>Stars</CTh>
              <CTh sortKey={"forks"}>Forks</CTh>
              <CTh sortKey={"updated"}>Updated</CTh>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray/20">
            {repositories.map((repo) => {
              return (
                <tr
                  key={repo.id}
                  onClick={() => {
                    window.open(repo.html_url, "_blank");
                  }}
                  className="hover:bg-primary-light transition-colors duration-200 cursor-pointer odd:bg-primary-light/30 backdrop-blur text-start"
                >
                  <td className="p-2 md:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 hidden md:block">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={repo.owner.avatar_url}
                          alt={`${repo.owner.login} avatar`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-light">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-secondary transition-colors duration-200 underline underline-offset-4 hover:no-underline"
                          >
                            {repo.name}
                          </a>
                        </div>
                        <div className="text-xs text-gray">
                          by {repo.owner.login}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 md:px-6 md:py-4 whitespace-nowrap">
                    {repo.language ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                        {repo.language}
                      </span>
                    ) : (
                      <span className="text-gray/50">-</span>
                    )}
                  </td>
                  <td className="p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-light">
                    {repo.stargazers_count}
                  </td>
                  <td className="p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-light">
                    {repo.forks_count}
                  </td>
                  <td className="p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray">
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-2">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            onClick={() => {
              window.open(repo.html_url, "_blank");
            }}
            className="bg-primary-light/30 backdrop-blur rounded-lg p-3 hover:bg-primary-light transition-colors duration-200 cursor-pointer border border-gray/20"
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
                <p className=" font-semibold text-light">
                  {repo.stargazers_count}
                </p>
                <p className="text-gray/70 text-xs mt-1">Stars</p>
              </div>
              <div>
                <p className=" font-semibold text-light">{repo.forks_count}</p>
                <p className=" text-gray/70 text-xs mt-1">Forks</p>
              </div>
              <div>
                <p className="text-light">
                  {new Date(repo.updated_at).toLocaleDateString()}
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
        ))}
      </div>
    </div>
  );
}

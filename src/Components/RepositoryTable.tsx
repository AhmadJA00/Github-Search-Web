import type { GitHubRepository } from "../types";
import CTh from "./CTh";
import RepoCard from "./RepoCard";

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
                    {new Date(repo.pushed_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-2">
        {repositories.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

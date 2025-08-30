import type { GitHubRepository } from "../types";
import CTh from "./CTh";

interface RepositoryTableProps {
  repositories: GitHubRepository[];
}

export default function RepositoryTable({
  repositories,
}: RepositoryTableProps) {
  return (
    <div className="overflow-hidden border border-gray rounded-lg">
      <table className="min-w-full   ">
        <thead className="bg-primary-light">
          <tr>
            <CTh>Repository</CTh>
            <CTh sortKey={"language"}>Language</CTh>
            <CTh sortKey={"stars"}>Stars</CTh>
            <CTh sortKey={"forks"}>Forks</CTh>
            <CTh sortKey={"updated"}>Updated</CTh>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray/20">
          {repositories.map((repo) => {
            return (
              <tr
                key={repo.id}
                onClick={() => {
                  window.open(repo.html_url, "_blank");
                }}
                className="hover:bg-primary-light transition-colors duration-200 cursor-pointer"
              >
                <td className="p-2 md:px-6 md:py-4">
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
                      <div className="text-sm text-gray">
                        by {repo.owner.login}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-2 md:px-6 md:py-4 whitespace-nowrap">
                  {repo.language ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
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
  );
}

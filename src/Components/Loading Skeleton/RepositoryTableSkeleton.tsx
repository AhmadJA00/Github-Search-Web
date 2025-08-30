import React from "react";

interface RepositoryTableSkeletonProps {
  count?: number;
}

const RepositoryTableSkeleton: React.FC<RepositoryTableSkeletonProps> = ({
  count = 5,
}) => {
  return (
    <div className="overflow-hidden border border-gray/30 rounded-lg flex-4 w-full">
      <table className="min-w-full bg-primary  ">
        <thead className="bg-primary-light">
          <tr>
            {[1, 2, 3, 4, 5].map((item) => (
              <th
                key={item}
                className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider"
              >
                <div className="h-5 bg-gray/30 rounded w-24 mb-2"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-primary divide-y divide-gray/20">
          {Array.from({ length: count }).map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {/* Avatar skeleton */}
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="w-10 h-10 rounded-full bg-gray/30"></div>
                  </div>
                  <div className="ml-4">
                    {/* Repository name skeleton */}
                    <div className="h-5 bg-gray/30 rounded w-32 mb-2"></div>
                    {/* Owner skeleton */}
                    <div className="h-4 bg-gray/30 rounded w-24 mb-2"></div>
                  </div>
                </div>
              </td>
              {/* Language skeleton */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-16 h-6 bg-gray/30 rounded-full"></div>
              </td>
              {/* Stars skeleton */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-5 bg-gray/30 rounded w-8"></div>
              </td>
              {/* Forks skeleton */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-5 bg-gray/30 rounded w-8"></div>
              </td>
              {/* Updated date skeleton */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-5 bg-gray/30 rounded w-20"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepositoryTableSkeleton;

import React from "react";

const RepoCardSkeleton: React.FC = () => {
  return (
    <div className="border border-gray rounded-lg p-4 animate-pulse">
      <div className="flex flex-col gap-5">
        {/* Header section with title, full name, date, and badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 flex flex-col gap-1">
            {/* Repository name skeleton */}
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            {/* Full name skeleton */}
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray">
            {/* Date skeleton */}
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
            {/* Badge skeleton */}
            <div className="w-16 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Description section */}
        <div className="flex items-center flex-wrap gap-1">
          {/* Description text skeleton */}
          <div className="h-4 bg-gray-300 rounded w-full max-w-md"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Stats section */}
        <div className="flex items-center gap-4 text-sm text-gray">
          {/* Language skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          {/* Stars skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          {/* Forks skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          {/* Issues skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCardSkeleton;

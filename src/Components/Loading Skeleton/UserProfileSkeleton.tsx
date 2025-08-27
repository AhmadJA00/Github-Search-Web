import React from "react";

const UserProfileSkeleton: React.FC = () => {
  return (
    <div className="border border-gray rounded-lg animate-pulse">
      <div className="p-5 flex gap-5">
        {/* Avatar skeleton */}
        <div className="w-40 h-40 rounded-full bg-gray-300"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 gap-x-5 flex-1">
          {/* Name skeleton */}
          <div className="col-span-2">
            <div className="h-8 md:h-10 bg-gray-300 rounded w-48"></div>
          </div>

          {/* Bio and username skeleton */}
          <div className="col-span-2 flex items-center gap-2">
            <div className="h-4 md:h-5 bg-gray-300 rounded w-32"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-24"></div>
          </div>

          {/* Followers/Following skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-24"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-20"></div>
          </div>

          {/* Company skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-20"></div>
          </div>

          {/* Location skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-32"></div>
          </div>

          {/* Email skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-40"></div>
          </div>

          {/* Public repos skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-36"></div>
          </div>

          {/* Private repos skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-4 md:h-5 bg-gray-300 rounded w-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;

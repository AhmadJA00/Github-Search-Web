import React from "react";

const UserProfileSkeleton: React.FC = () => {
  return (
    <div className="border border-gray/30 rounded-lg animate-pulse">
      <div className="p-2 md:p-5 flex flex-col md:flex-row gap-5">
        {/* Avatar skeleton - matches responsive sizing */}
        <div className="w-28 md:w-40 h-28 md:h-40 rounded-full bg-gray-300 mx-auto md:mx-0"></div>

        {/* Grid layout matching the real component */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 gap-x-3 md:gap-x-5 flex-1">
          {/* Name skeleton - spans 2 cols on mobile, 3 on desktop */}
          <div className="col-span-2 md:col-span-3">
            <div className="h-6 md:h-10 bg-gray-300 rounded w-32 md:w-48 mx-auto md:mx-0"></div>
          </div>

          {/* Bio and username skeleton - spans 2 cols on mobile, 3 on desktop */}
          <div className="col-span-2 md:col-span-3 flex items-center justify-center md:justify-start gap-2">
            <div className="h-3 md:h-5 bg-gray-300 rounded w-24 md:w-32"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-20 md:w-24"></div>
          </div>

          {/* Followers/Following skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-20 md:w-24"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-16 md:w-20"></div>
          </div>

          {/* Company skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-16 md:w-20"></div>
          </div>

          {/* Location skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-24 md:w-32"></div>
          </div>

          {/* Email skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-32 md:w-40"></div>
          </div>

          {/* Public repos skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-28 md:w-36"></div>
          </div>

          {/* Private repos skeleton */}
          <div className="flex items-center gap-1 md:gap-3">
            <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
            <div className="h-3 md:h-5 bg-gray-300 rounded w-28 md:w-36"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;

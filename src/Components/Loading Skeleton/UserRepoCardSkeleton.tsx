const UserRepoCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[1, 2, 3, 4].map((item) => {
        return (
          <div
            key={item}
            className="border border-gray/30 rounded-lg p-2 md:p-5 animate-pulse"
          >
            <div className="flex flex-col gap-5">
              {/* Header section with title, full name, date, and badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  {/* Repository name skeleton */}
                  <div className="h-5 md:h-6 bg-gray-300 rounded w-32 md:w-40"></div>
                  {/* Full name skeleton */}
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-40 md:w-48"></div>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray">
                  {/* Date skeleton */}
                  <div className="flex items-center gap-1">
                    <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
                    <div className="h-3 md:h-4 bg-gray-300 rounded w-16 md:w-20"></div>
                  </div>
                  {/* Badge skeleton */}
                  <div className="w-12 md:w-16 h-4 md:h-5 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Description section */}
              <div className="flex items-center flex-wrap gap-1">
                {/* Description text skeleton */}
                <div className="h-3 md:h-4 bg-gray-300 rounded w-full max-w-md"></div>
                <div className="h-3 md:h-4 bg-gray-300 rounded w-24 md:w-32"></div>
                <div className="h-3 md:h-4 bg-gray-300 rounded w-20 md:w-24"></div>
              </div>

              {/* Stats section */}
              <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray">
                {/* Language skeleton */}
                <div className="flex items-center gap-1">
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-gray-300"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-12 md:w-16"></div>
                </div>
                {/* Stars skeleton */}
                <div className="flex items-center gap-1">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-12 md:w-16"></div>
                </div>
                {/* Forks skeleton */}
                <div className="flex items-center gap-1">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-12 md:w-16"></div>
                </div>
                {/* Issues skeleton */}
                <div className="flex items-center gap-1">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-12 md:w-16"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserRepoCardSkeleton;

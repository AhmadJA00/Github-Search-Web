const RepoCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="border border-gray/30 rounded-lg p-2 md:p-5 backdrop-blur md:backdrop-blur-xl animate-pulse"
        >
          {/* Header section with avatar and repo info */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {/* Avatar skeleton */}
              <div className="h-8 w-8 rounded-full bg-gray/30"></div>
              <div className="space-y-2">
                {/* Repo name skeleton */}
                <div className="h-4 w-32 bg-gray/30 rounded"></div>
                {/* Owner name skeleton */}
                <div className="h-3 w-20 bg-gray/30 rounded"></div>
              </div>
            </div>
          </div>

          {/* Stats section skeleton */}
          <div className="flex items-center justify-between gap-2 text-center text-sm">
            {/* Stars skeleton */}
            <div>
              <div className="h-4 w-8 bg-gray/30 rounded mx-auto"></div>
              <div className="h-3 w-12 bg-gray/30 rounded mx-auto mt-1"></div>
            </div>
            {/* Forks skeleton */}
            <div>
              <div className="h-4 w-8 bg-gray/30 rounded mx-auto"></div>
              <div className="h-3 w-12 bg-gray/30 rounded mx-auto mt-1"></div>
            </div>
            {/* Updated date skeleton */}
            <div>
              <div className="h-4 w-20 bg-gray/30 rounded mx-auto"></div>
              <div className="h-3 w-16 bg-gray/30 rounded mx-auto mt-1"></div>
            </div>
            {/* Language skeleton */}
            <div>
              <div className="h-6 w-16 bg-gray/30 rounded-full mx-auto"></div>
              <div className="h-3 w-16 bg-gray/30 rounded mx-auto mt-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoCardSkeleton;

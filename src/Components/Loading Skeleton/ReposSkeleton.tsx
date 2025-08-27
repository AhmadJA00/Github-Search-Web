import React from "react";
import RepoCardSkeleton from "./RepoCardSkeleton";

interface ReposSkeletonProps {
  count?: number;
}

const ReposSkeleton: React.FC<ReposSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <RepoCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ReposSkeleton;

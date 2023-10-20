import React from "react";
import Skeleton from "react-loading-skeleton";

const GridSkeletonLoaderCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map(index => (
        <div key={index}>
          <div className="p-5">
            <Skeleton
              height={200}
              baseColor="#bbbbbb"
              highlightColor="#d3d3d3"
            />
          </div>
          <Skeleton baseColor="#bbbbbb" highlightColor="#d3d3d3" />
          <Skeleton baseColor="#bbbbbb" highlightColor="#d3d3d3" />
          <ul className="mt-2">
            <Skeleton
              className="mb-2"
              baseColor="#bbbbbb"
              highlightColor="#d3d3d3"
            />
            <Skeleton
              className="mb-2"
              baseColor="#bbbbbb"
              highlightColor="#d3d3d3"
            />
            <Skeleton
              className="mb-2"
              baseColor="#bbbbbb"
              highlightColor="#d3d3d3"
            />
            <Skeleton
              className="mb-2"
              baseColor="#bbbbbb"
              highlightColor="#d3d3d3"
            />
          </ul>
          <div className="flex items-center justify-between gap-2 mt-3 pr-6">
            <div className="flex items-center gap-2">
              <Skeleton
                width={50}
                baseColor="#bbbbbb"
                highlightColor="#d3d3d3"
              />
              <Skeleton
                width={50}
                baseColor="#bbbbbb"
                highlightColor="#d3d3d3"
              />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton
                width={40}
                height={40}
                baseColor="#bbbbbb"
                highlightColor="#d3d3d3"
              />
              <Skeleton
                width={40}
                height={40}
                baseColor="#bbbbbb"
                highlightColor="#d3d3d3"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridSkeletonLoaderCard;

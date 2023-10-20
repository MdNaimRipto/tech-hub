import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

const GridSkeletonLoaderCard = () => {
  const [limit, setLimit] = useState([1, 2, 3, 4, 5]);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1279px)",
  });

  useEffect(() => {
    // Function to update the limit based on screen size
    const updateLimit = () => {
      if (isLaptop) {
        setLimit([1, 2, 3, 4]);
      } else if (isTablet) {
        setLimit([1, 2, 3]);
      } else if (isMobile) {
        setLimit([1, 2, 3, 4, 5]);
      } else {
        setLimit([1, 2, 3, 4, 5]);
      }
    };

    // Initial update
    updateLimit();

    // Add a resize event listener to handle changes
    window.addEventListener("resize", updateLimit);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, [isMobile, isTablet, isLaptop]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {limit.map(index => (
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

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import GridSkeletonLoaderCard from "./GridSkeletonLoaderCard";
import Title from "../../componentTitle/Title";

const TopSellingProductsLoader = () => {
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
        setLimit([1, 2, 3, 4, 5, 6, 7, 8]);
      } else if (isTablet) {
        setLimit([1, 2, 3, 4, 5, 6]);
      } else if (isMobile) {
        setLimit([1, 2, 3, 4, 5, 6, 7, 8]);
      } else {
        setLimit([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
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
    <div className="mb-16 container px-4">
      <Title
        title="Top Selling Products"
        subTitle="Discover Our Best Selling Products"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {limit.map(index => (
          <GridSkeletonLoaderCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopSellingProductsLoader;

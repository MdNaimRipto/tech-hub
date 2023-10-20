import GridSkeletonLoaderCard from "@/components/common/Loaders/GridSkeletonLoaderCard";
import GridProductCard from "@/components/common/productCard/GridProductCard";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import {
  IProducts,
  IProductsByCategoryFilter,
} from "@/types/productTypes/productsTypes";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const GamingProducts = ({ param }: { param: string }) => {
  const [limit, setLimit] = useState("5"); // Default limit

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
        setLimit("4");
      } else if (isTablet) {
        setLimit("3");
      } else if (isMobile) {
        setLimit("5");
      } else {
        setLimit("5");
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

  const option: IProductsByCategoryFilter = {
    category: param,
    limit: limit,
    sortBy: "discountedPrice",
  };
  const { data, isLoading } = useGetProductsByCategoryQuery(option);
  if (isLoading) {
    return <GridSkeletonLoaderCard />;
  }
  const products = data?.data?.data;
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product: IProducts) => (
        <GridProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default GamingProducts;

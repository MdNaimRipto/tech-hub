import GridSkeletonLoaderCard from "@/components/common/Loaders/GridSkeletonLoaderCard";
import TopSellingAdds from "@/components/common/adds/TopSellingAdds";
import Title from "@/components/common/componentTitle/Title";
import GridProductCard from "@/components/common/productCard/GridProductCard";
import { useGetTopSellingProductsQuery } from "@/redux/features/products/productsApi";
import { IProducts } from "@/types/productTypes/productsTypes";
import React from "react";

const TopSellingProducts = () => {
  const { data, isLoading } = useGetTopSellingProductsQuery({});

  if (isLoading) {
    return <GridSkeletonLoaderCard />;
  }

  const products = data.data;

  return (
    <div className="mb-16 container px-4">
      <Title
        title="Top Selling Products"
        subTitle="Discover Our Best Selling Products"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product: IProducts) => (
          <GridProductCard key={product._id} product={product} />
        ))}
        <div className="col-span-2 md:col-span-1 xl:col-span-2 hidden md:block lg:hidden xl:block">
          <TopSellingAdds />
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;

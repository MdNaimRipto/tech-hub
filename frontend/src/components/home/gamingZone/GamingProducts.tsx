import GridSkeletonLoaderCard from "@/components/common/Loaders/GridSkeletonLoaderCard";
import GridProductCard from "@/components/common/productCard/GridProductCard";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import {
  IProducts,
  IProductsByCategoryFilter,
} from "@/types/productTypes/productsTypes";

const GamingProducts = ({ param }: { param: string }) => {
  const option: IProductsByCategoryFilter = {
    category: param,
    limit: "5",
    sortBy: "discountedPrice",
  };
  const { data, isLoading } = useGetProductsByCategoryQuery(option);
  if (isLoading) {
    return <GridSkeletonLoaderCard />;
  }
  const products = data?.data?.data;
  console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {products.map((product: IProducts) => (
        <GridProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default GamingProducts;

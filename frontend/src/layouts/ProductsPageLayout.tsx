import Products from "@/pages/products";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import ProductsPageSubNav from "@/shared/subNavs/ProductsPageSubNav";
import {
  IProducts,
  IProductsByCategoryFilter,
} from "@/types/productTypes/productsTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductsPageLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceValue, setPriceValue] = useState<number[]>([0, maxPrice]);
  const router = useRouter();
  const { category } = router.query;

  const [filterValues, setFilterValues] = useState({
    status: "",
    brand: "",
    sortOrder: "desc",
  });
  const option: IProductsByCategoryFilter = {
    category: `${category}`,
    limit: "15",
    sortBy: "discountedPrice",
    sortOrder: filterValues.sortOrder,
    status: filterValues?.status,
    brand: filterValues?.brand,
  };
  const { data, isLoading, isError, refetch } =
    useGetProductsByCategoryQuery(option);

  useEffect(() => {
    if (!isLoading) {
      setProducts(data?.data?.data);
    }
  }, [isLoading, data?.data?.data]);

  useEffect(() => {
    if (!isLoading && !isError) {
      const filterProduct = products.filter(
        (p: IProducts) =>
          p.discountedPrice >= priceValue[0] &&
          p.discountedPrice <= priceValue[1]
      );

      // Set the filtered products
      setFilteredProducts(filterProduct);
    } else {
      setFilteredProducts([]);
    }
  }, [isLoading, priceValue, products, isError]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const handleRefetch = () => {
    refetch();
  };

  return (
    <>
      <Navbar />
      <div className={`lg:grid grid-cols-5 container px-4 min-h-[700px] my-12`}>
        <ProductsPageSubNav
          isSideBarOpen={isSideBarOpen}
          category={category as string}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          handleRefetch={handleRefetch}
          priceValue={priceValue as [number, number]}
          setPriceValue={setPriceValue}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <main className="col-span-4 relative">
          <Products
            setIsSideBarOpen={setIsSideBarOpen}
            isSideBarOpen={isSideBarOpen}
            products={filteredProducts}
            category={category as string}
            setFilterValues={setFilterValues}
            isError={isError}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPageLayout;

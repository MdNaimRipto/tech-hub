import React, { ReactElement, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import PriceFilter from "@/components/common/adminDashboard/filterComponents/PriceFilter";
import CategoryFilter from "@/components/common/adminDashboard/filterComponents/CategoryFilter";
import PaginationComponent from "@/components/common/adminDashboard/PaginationComponent";
import ProductTable from "@/components/common/adminDashboard/tables/ProductTable";

const CategoryProducts = () => {
  const pageValue = Number(localStorage.getItem("categoryPage"));
  const [page, setPage] = useState<number>(pageValue ? pageValue : 1);
  const currentCategory = JSON.parse(
    localStorage.getItem("category") as string
  );
  const [category, setCategory] = useState<string>(
    currentCategory && currentCategory !== "" ? currentCategory : "LAPTOP"
  );

  const [sortOrder, setSortOrder] = useState("desc");

  const option = {
    category: category,
    page: `${page}`,
    sortOrder: sortOrder,
    sortBy: "discountedPrice",
  };

  console.log(option);

  const { data, isLoading } = useGetProductsByCategoryQuery(option);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  const products = data.data.data;
  const count = data.data.meta.total;

  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-lg font-medium">Select Filter Options:</h6>
        <div>
          <PriceFilter setSortOrder={setSortOrder} />
          <CategoryFilter setCategory={setCategory} setPage={setPage} />
        </div>
      </div>
      <ProductTable products={products} />
      <PaginationComponent
        count={count}
        page={page}
        setPage={setPage}
        storageName="categoryPage"
      />
    </div>
  );
};

export default CategoryProducts;

CategoryProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

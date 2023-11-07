import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const CategoryProducts = () => {
  return <div></div>;
};

export default CategoryProducts;

CategoryProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

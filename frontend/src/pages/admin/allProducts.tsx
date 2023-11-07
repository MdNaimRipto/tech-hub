import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const AllProducts = () => {
  return <div></div>;
};

export default AllProducts;

AllProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

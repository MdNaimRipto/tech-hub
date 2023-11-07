import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const AddProducts = () => {
  return <div></div>;
};

export default AddProducts;

AddProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

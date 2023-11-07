import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const EditProducts = () => {
  return <div></div>;
};

export default EditProducts;

EditProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

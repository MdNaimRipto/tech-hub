import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const OrderedProducts = () => {
  return <div></div>;
};

export default OrderedProducts;

OrderedProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

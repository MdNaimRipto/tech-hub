import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const ProductQuestions = () => {
  return <div></div>;
};

export default ProductQuestions;

ProductQuestions.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

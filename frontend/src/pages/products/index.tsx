import { useRouter } from "next/router";
import React from "react";

const Products = () => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div>
      <h2>{category}</h2>
    </div>
  );
};

export default Products;

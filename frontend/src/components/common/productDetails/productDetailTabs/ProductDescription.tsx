import React from "react";

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <p className="mt-12 font-medium leading-8 text-justify min-h-[200px]">
      {description}
    </p>
  );
};

export default ProductDescription;

import React from "react";

const ProductDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mt-8  min-h-[200px]">
      <h4 className="mb-6 text-black text-xl font-medium">
        Details of {title}
      </h4>
      <p className="font-medium leading-8 text-justify">{description}</p>
    </div>
  );
};

export default ProductDescription;

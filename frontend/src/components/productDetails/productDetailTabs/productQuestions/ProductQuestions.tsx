import React from "react";
import AskQuestion from "./AskQuestion";
import AskedQuestions from "./AskedQuestions";

const ProductQuestions = ({ productId }: { productId: string }) => {
  return (
    <div className="min-h-[200px]">
      <AskQuestion productId={productId} />
      <AskedQuestions productId={productId} />
    </div>
  );
};

export default ProductQuestions;

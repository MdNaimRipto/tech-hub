import React from "react";
import AskQuestion from "./AskQuestion";
import AskedQuestions from "./AskedQuestions";

const ProductQuestions = ({ productId }: { productId: string }) => {
  return (
    <div className="min-h-[200px]">
      <AskQuestion productId={productId} />
      <AskedQuestions />
    </div>
  );
};

export default ProductQuestions;

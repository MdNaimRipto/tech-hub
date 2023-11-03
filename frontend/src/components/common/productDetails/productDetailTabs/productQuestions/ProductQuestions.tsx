import React from "react";
import AskQuestion from "./AskQuestion";
import AskedQuestions from "./AskedQuestions";

const ProductQuestions = () => {
  return (
    <div className="min-h-[200px]">
      <AskQuestion />
      <AskedQuestions />
    </div>
  );
};

export default ProductQuestions;

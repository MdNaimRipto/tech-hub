import React from "react";
import AddRatingAndReviews from "./AddRatingAndReviews";
import ProductReviews from "./ProductReviews";

const RatingAndReviews = ({ productId }: { productId: string }) => {
  return (
    <div className="min-h-[200px]">
      <AddRatingAndReviews productId={productId} />
      <ProductReviews productId={productId} />
    </div>
  );
};

export default RatingAndReviews;

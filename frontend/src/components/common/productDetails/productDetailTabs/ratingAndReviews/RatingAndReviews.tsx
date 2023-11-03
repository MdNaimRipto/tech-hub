import React from "react";
import AddRatingAndReviews from "./AddRatingAndReviews";
import ProductReviews from "./ProductReviews";

const RatingAndReviews = () => {
  return (
    <div className="min-h-[200px]">
      <AddRatingAndReviews />
      <ProductReviews />
    </div>
  );
};

export default RatingAndReviews;

import Image from "next/image";
import React from "react";
import { Rating, Avatar } from "@mui/material";
import { useGetReviewsQuery } from "@/redux/features/reviewsAndRatings/reviewsAndRatingsApis";
import { IRatingAndReviews } from "@/types/reviewsAndRatings/reviewsAndRatingTypes";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useGetReviewsQuery({ id: productId });

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  const reviews = data.data as IRatingAndReviews[];

  if (!reviews.length) {
    return <h2>0 Reviews Found</h2>;
  }

  return (
    <div className="mt-8 px-4">
      {reviews.map((review: IRatingAndReviews) => (
        <div className="flex items-start gap-4 mb-3" key={review._id}>
          <Avatar
            alt="User Avatar"
            src={review.userId.userProfile}
            sx={{ width: 45, height: 45 }}
          />
          <div className="font-medium text-black">
            <h4 className="text-lg mb-2">{review.userId.name}</h4>
            <p className="text-sm leading-6 mb-2">{review.review}</p>
            <Rating
              name="simple-controlled"
              value={review.rating}
              readOnly
              size="small"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;

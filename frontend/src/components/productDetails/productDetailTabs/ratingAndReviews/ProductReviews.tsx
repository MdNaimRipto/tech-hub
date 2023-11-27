import Image from "next/image";
import React from "react";
import { Rating, Avatar } from "@mui/material";
import { useGetReviewsQuery } from "@/redux/features/reviewsAndRatings/reviewsAndRatingsApis";
import { IRatingAndReviews } from "@/types/reviewsAndRatings/reviewsAndRatingTypes";
import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";

const ProductReviews = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useGetReviewsQuery({ id: productId });

  if (isLoading) {
    return <CommonLoader />;
  }

  const reviews = data.data as IRatingAndReviews[];

  if (!reviews.length) {
    return <NotFoundMessage heightStyle="h-[200px]" title="0 Reviews Found" />;
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

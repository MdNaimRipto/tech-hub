import React, { useState } from "react";
import SubmitBtn from "@/components/common/buttons/SubmitBtn";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { useAddReviewAndRatingMutation } from "@/redux/features/reviewsAndRatings/reviewsAndRatingsApis";
import { useUserContext } from "@/context/AuthContext";

const AddRatingAndReviews = ({ productId }: { productId: string }) => {
  const { user, token } = useUserContext();
  const [rating, setRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [addRatingAndReviews] = useAddReviewAndRatingMutation();
  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const review = form.review.value;
    if (rating <= 0) {
      toast.error("Please Add Rating!");
      setIsLoading(false);
    } else {
      const option = {
        data: {
          userId: user?._id,
          productId: productId,
          review: review,
          rating: rating,
        },
        token: token,
      };

      try {
        const res = await addRatingAndReviews(option).unwrap();
        if (res.success) {
          toast.success(res.message);
          setIsLoading(false);
          setRating(0);
          form.reset();
        }
      } catch (error: any) {
        console.log("Error:", error);
        toast.error(error.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleReviewSubmit}
      className="pb-8 border-b border-b-input"
    >
      <textarea
        name="review"
        id="review"
        placeholder="Write a Review"
        className="p-2 w-full rounded border-b border-b-light-gray my-4 focus:outline-none"
        required
        maxLength={250}
      />
      <div className="flex items-center gap-4">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue as number);
          }}
        />
        <SubmitBtn title="Add Review" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default AddRatingAndReviews;

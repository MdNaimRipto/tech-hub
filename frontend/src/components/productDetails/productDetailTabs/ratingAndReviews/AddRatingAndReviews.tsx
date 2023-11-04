import React, { useState } from "react";
import SubmitBtn from "@/components/common/buttons/SubmitBtn";
import { Rating } from "@mui/material";

const AddRatingAndReviews = () => {
  const [rating, setRating] = useState<number | null>(0);

  const handleReviewSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    console.log(review, rating);
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
            setRating(newValue);
          }}
        />
        <SubmitBtn title="Add Review" />
      </div>
    </form>
  );
};

export default AddRatingAndReviews;

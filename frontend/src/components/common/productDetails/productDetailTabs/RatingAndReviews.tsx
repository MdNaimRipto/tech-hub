import React, { useState } from "react";
import SubmitBtn from "../../buttons/SubmitBtn";
import { Rating } from "@mui/material";

const RatingAndReviews = () => {
  const [rating, setRating] = useState<number | null>(0);
  console.log(rating);
  return (
    <div className="min-h-[200px]">
      <form>
        <textarea
          placeholder="Write a Review"
          className="p-5 w-full rounded border border-light-gray my-4 focus:outline-none"
          rows={3}
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
    </div>
  );
};

export default RatingAndReviews;

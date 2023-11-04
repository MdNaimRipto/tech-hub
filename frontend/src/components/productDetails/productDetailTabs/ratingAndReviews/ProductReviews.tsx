import Image from "next/image";
import React from "react";
import { Rating, Avatar } from "@mui/material";

const ProductReviews = () => {
  return (
    <div className="mt-8 px-4">
      {[1, 2, 3, 4, 5].map((review, i) => (
        <div className="flex items-start gap-4 mb-3" key={i}>
          <Avatar
            alt="User Avatar"
            src="https://i.ibb.co/dcHVrp8/User-Profile-PNG-Image.png"
            sx={{ width: 45, height: 45 }}
          />
          <div className="font-medium text-black">
            <h4 className="text-lg mb-2">MD Naimur Rahman</h4>
            <p className="text-sm leading-6 mb-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam nemo beatae est consectetur maiores expedita quo.
              Voluptatem, tempore! Excepturi adipisci dolor consequatur
              voluptatibus praesentium iste dolores laborum ullam maiores. Ea.
            </p>
            <Rating name="simple-controlled" value={4} readOnly size="small" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;

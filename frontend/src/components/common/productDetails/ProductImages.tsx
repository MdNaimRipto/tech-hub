import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface IImages {
  images: {
    i1: string;
    i2?: string;
    i3?: string;
    i4?: string;
  };
}

const ProductImages = ({ images }: IImages) => {
  const [isActive, setIsActive] = useState(0);

  const { i1, i2, i3, i4 } = images;
  const imagesArray = [i1];

  if (i2) imagesArray.push(i2);
  if (i3) imagesArray.push(i3);
  if (i4) imagesArray.push(i4);

  useEffect(() => {
    // Function to handle the next image
    const nextImage = () => {
      setIsActive(prevIndex => (prevIndex + 1) % imagesArray.length);
    };

    const interval = setInterval(nextImage, 3500); // Change image every 3.5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [imagesArray.length]);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-4">
      <div className="w-full lg:w-[14%] flex flex-row lg:flex-col gap-2 md:gap-4">
        {imagesArray.map((img, i) => (
          <Button
            key={i}
            sx={{
              width: "100%",
              height: {
                xs: "80%",
                sm: "100%",
              },
              padding: "12px",
              border: "1px solid #e2e2e2",
              backgroundColor: `${i === isActive && "#e2e2e2 !important"}`,
            }}
            onClick={() => setIsActive(i)}
          >
            <Image src={img} alt="Images" width={100} height={100} priority />
          </Button>
        ))}
      </div>
      <div className="w-full md:w-[70%] p-12 border border-input">
        {imagesArray.map((img, i) => (
          <div key={i} className={`${isActive === i ? "block" : "hidden"}`}>
            <Image src={img} alt="Images" width={450} height={450} priority />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

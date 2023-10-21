import React, { useState, useEffect } from "react";
import image1 from "../../../assets/banner/side-banner1.png";
import image2 from "../../../assets/banner/side-banner2.png";
import Image from "next/image";

const products = [
  {
    image: image1,
  },
  {
    image: image2,
  },
];

const TopSellingAdds = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate the next slide index
      const nextSlide = (currentSlide + 1) % products.length;
      setCurrentSlide(nextSlide);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  return (
    <div className={`h-full pt-5`}>
      {products.map((p, index) => (
        <Image
          key={index}
          src={p.image}
          alt={`Slide ${index + 1}`}
          priority={true}
          className={`mx-auto mt-10 md:mt-0 ${
            index === currentSlide ? "block" : "hidden"
          }`}
        />
      ))}
    </div>
  );
};

export default TopSellingAdds;

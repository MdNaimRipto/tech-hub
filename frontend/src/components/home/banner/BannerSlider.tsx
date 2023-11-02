import React, { useState, useEffect } from "react";
import image1 from "@/assets/banner/banner-image1.png";
import image2 from "@/assets/banner/banner-Image2.png";
import image3 from "@/assets/banner/banner-Image3.png";
import Image from "next/image";
import BuyNowBtn from "@/components/common/buttons/BuyNowBtn";

const products = [
  {
    brand: "ASUS",
    title1: "Asus TUF VG27AQ1A",
    title2: "Gaming Monitor",
    image: image3,
    bg: "from-[#ef9947] to-[#d7ae6e]",
  },
  {
    brand: "MSI",
    title1: "MSI Creator Z16 HX",
    title2: "Gaming Laptop",
    image: image1,
    bg: "from-[#7685d5] to-[#c99fbb]",
  },
  {
    brand: "COLORFUL",
    title1: "Colorful RTX 3060",
    title2: "Graphics Card",
    image: image2,
    bg: "from-[#798acdd1] to-[#6c8dd2f2]",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate the next slide index
      const nextSlide = (currentSlide + 1) % products.length;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  return (
    <div className={`h-full relative`}>
      {products.map((p, index) => (
        <div
          key={index}
          className={`flex flex-col-reverse md:flex-row items-center justify-around ${
            index === currentSlide ? "block" : "hidden"
          } bg-gradient-to-l ${p.bg} h-full pb-16 md:pb-0`}
        >
          <div className="w-[85%] md:w-full lg:w-[95%] md:pl-8 lg:pl-16">
            <span className="bg-input text-[10px] text-primary px-2 rounded-2xl py-1">
              {p.brand}
            </span>
            <h2 className="text-xl md:text-[22px] lg:text-3xl text-white font-bold mt-3">
              {p.title1}
            </h2>
            <h2 className="text-xl md:text-[22px] lg:text-3xl text-white font-bold mt-3 mb-4">
              {p.title2}
            </h2>
            <BuyNowBtn
              title="Buy Now"
              background="#ffffff"
              color="#ff7a1a"
              hover="#e2e2e2"
            />
          </div>
          <div>
            <Image
              src={p.image}
              alt={`Slide ${index + 1}`}
              priority={true}
              className="block mx-auto mt-10 md:mt-0"
            />
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <button
          className={`w-6 h-2 ${
            currentSlide === 0 ? "bg-primary" : "bg-white"
          }  mx-1`}
          onClick={() => setCurrentSlide(0)}
        ></button>
        <button
          className={`w-6 h-2 ${
            currentSlide === 1 ? "bg-primary" : "bg-white"
          }  mx-1`}
          onClick={() => setCurrentSlide(1)}
        ></button>
        <button
          className={`w-6 h-2 ${
            currentSlide === 2 ? "bg-primary" : "bg-white"
          }  mx-1`}
          onClick={() => setCurrentSlide(2)}
        ></button>
      </div>
    </div>
  );
};

export default Slider;

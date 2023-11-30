import React, { useState, useEffect } from "react";
import image1 from "@/assets/banner/banner-image1.png";
import image2 from "@/assets/banner/banner-image2.png";
import image3 from "@/assets/banner/banner-image3.png";
import Image from "next/image";
import BuyNowBtn from "@/components/common/buttons/BuyNowBtn";
import Link from "next/link";
import { IconButton } from "@mui/material";
import ForwardIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import BackwardIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const products = [
  {
    brand: "ASUS",
    title1: "Asus TUF VG27AQ1A",
    title2: "Gaming Monitor",
    image: image3,
    bg: "from-[#ef9947] to-[#d7ae6e]",
    link: "/products/652a227abf54b2b7202f3ac7",
  },
  {
    brand: "MSI",
    title1: "MSI Creator Z16 HX",
    title2: "Gaming Laptop",
    image: image1,
    bg: "from-[#7685d5] to-[#c99fbb]",
    link: "/products/652fa3c34ca9b292e4aa3840",
  },
  {
    brand: "COLORFUL",
    title1: "Colorful RTX 3060",
    title2: "Graphics Card",
    image: image2,
    bg: "from-[#798acdd1] to-[#6c8dd2f2]",
    link: "/products/65266843869c21fdb4e27833",
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

  const backward = () => {
    setCurrentSlide(
      prevSlide => (prevSlide - 1 + products.length) % products.length
    );
  };

  const forward = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % products.length);
  };

  return (
    <div className={`h-full relative overflow-hidden`}>
      {products.map((p, index) => (
        <div
          key={index}
          className="h-full absolute top-0 left-0 w-full transform transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(${
              currentSlide === index
                ? "0%"
                : currentSlide < index
                ? "-100%"
                : "100%"
            })`,
            order: currentSlide === index ? 1 : 0,
          }}
        >
          <div
            className={`flex flex-col-reverse md:flex-row items-center justify-around bg-gradient-to-l ${p.bg} h-full pb-16 md:pb-0`}
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
              <Link href={p.link}>
                <BuyNowBtn
                  title="Buy Now"
                  background="#ffffff"
                  color="#ff7a1a"
                  hover="#e2e2e2"
                />
              </Link>
            </div>
            <div>
              <Image
                src={p.image}
                alt={`Slide ${index}`}
                priority
                className="block mx-auto mt-10 md:mt-0"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        {products.map((slide, i) => (
          <button
            key={i}
            className={`w-4 md:w-6 h-2 ${
              currentSlide === i ? "bg-primary" : "bg-white"
            }  mx-1`}
            onClick={() => setCurrentSlide(i)}
          ></button>
        ))}
      </div>
      <div className="absolute bottom-5 right-3 flex gap-2">
        <IconButton
          onClick={backward}
          sx={{ background: `#f15700 !important` }}
        >
          <BackwardIcon
            sx={{
              color: "#ffffff",
              fontSize: {
                xs: 14,
                sm: 16,
              },
            }}
          />
        </IconButton>
        <IconButton onClick={forward} sx={{ background: `#ffffff !important` }}>
          <ForwardIcon
            sx={{
              color: "#f15700",
              fontSize: {
                xs: 14,
                sm: 16,
              },
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Slider;

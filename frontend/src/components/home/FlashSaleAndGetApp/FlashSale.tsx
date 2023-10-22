import React from "react";
import banner from "@/assets/get-app/get-app-bg.png";
import CountDown from "./CountDown";
import BuyNowBtn from "@/components/common/buttons/BuyNowBtn";

const FlashSale = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner.src})`,
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform: "rotate(180deg)",
      }}
      className="flex items-center justify-center text-black py-12 md:py-16 lg:py-0"
    >
      <div className="rotate-180 w-[94%] md:w-4/5">
        <p className="uppercase mb-4 font-semibold bg-input text-sm rounded-full p-1 w-2/5 md:w-1/4 text-center">
          Flash Sale
        </p>
        <CountDown />
        <h2 className="text-2xl xl:text-4xl mb-5 pt-3">
          Quick-Fire Flash Sale
        </h2>
        <p className="mb-5 font-medium text-sm xl:text-base">
          Get ready for lightning-fast savings! Our Quick-Fire Flash Sale is
          here for a limited time. Don”t miss out on incredible deals.
        </p>
        <BuyNowBtn
          title="Shop Now!"
          colorStyle="bg-gradient-to-bl from-secondary to-primary text-white"
        />
      </div>
    </div>
  );
};

export default FlashSale;

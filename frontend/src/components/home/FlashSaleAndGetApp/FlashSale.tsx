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
      className="flex items-end pb-14 justify-center text-black"
    >
      <div className="rotate-180">
        <p className="uppercase mb-4 font-semibold bg-input text-sm rounded-full p-1 w-1/4 text-center">
          Flash Sale
        </p>
        <CountDown />
        <h2 className="text-4xl mb-8 pt-3">Quick-Fire Flash Sale</h2>
        <BuyNowBtn
          title="Shop Now!"
          colorStyle="bg-gradient-to-bl from-secondary to-primary text-white"
        />
      </div>
    </div>
  );
};

export default FlashSale;

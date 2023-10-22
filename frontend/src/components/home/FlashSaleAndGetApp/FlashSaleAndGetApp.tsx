import React from "react";
import FlashSale from "./FlashSale";
import GetApp from "./GetApp";

const FlashSaleAndGetApp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16 lg:h-[450px] container md:px-4">
      <FlashSale />
      <GetApp />
    </div>
  );
};

export default FlashSaleAndGetApp;

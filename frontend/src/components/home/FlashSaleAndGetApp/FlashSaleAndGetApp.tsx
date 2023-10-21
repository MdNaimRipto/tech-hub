import React from "react";
import FlashSale from "./FlashSale";
import GetApp from "./GetApp";

const FlashSaleAndGetApp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 h-[450px]">
      <FlashSale />
      <GetApp />
    </div>
  );
};

export default FlashSaleAndGetApp;

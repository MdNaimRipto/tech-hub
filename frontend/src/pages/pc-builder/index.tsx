"use-client";
import MainLayout from "@/layouts/MainLayout";
import React, { ReactElement } from "react";
import Image from "next/image";
import PcBuilderSelectBtn from "@/components/common/buttons/PcBuilderSelectBtn";
import { PcBuilderOptions } from "@/components/pcBuilderComponents/PcBuilderOptions";
import { IProducts } from "@/types/productTypes/productsTypes";
import PcBuilderAddedProductCard from "@/components/common/productCard/PcBuilderAddedProductCard";

const PcBuilder = () => {
  const { products, options } = PcBuilderOptions();

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.discountedPrice,
    0
  );

  return (
    <div className="container w-[70%] border border-input p-5 my-5">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-black font-medium text-lg mb-2">
            Build Your Dream PC With Tech-Mart
          </h6>
          <p className="text-black font-medium text-sm">
            Select Your Components
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="border border-secondary px-5 py-3 text-secondary rounded">
            Total Items: {products.length}
          </p>
          <p className="bg-secondary px-5 py-3 text-white rounded">
            Total Price: {Math.floor(totalPrice)} Tk
          </p>
        </div>
      </div>
      <div className="my-6 py-6 mx-4 border-t border-t-input">
        {options.map((o, i) => (
          <div key={i}>
            {o?.product !== null ? (
              <PcBuilderAddedProductCard product={o?.product as IProducts} />
            ) : (
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <Image src={o.img} alt="CPU Logo" />
                  <p className="text-sm font-medium text-black">{o.title}</p>
                </div>
                <PcBuilderSelectBtn path={o.path} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PcBuilder;

PcBuilder.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

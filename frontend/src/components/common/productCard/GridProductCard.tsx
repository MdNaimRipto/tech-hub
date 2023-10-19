/* eslint-disable @next/next/no-img-element */
import { IProducts } from "@/types/productTypes/productsTypes";
import React from "react";
import GridCardButton from "../buttons/GridCardButton";

const GridProductCard = ({ product }: { product: IProducts }) => {
  console.log(product);
  const { features } = product;
  const productFeatures = [features.f2, features.f3, features.f4, features.f5];
  return (
    <div className="relative">
      {!product.status && (
        <div className="w-full absolute top-1/2 bg-opacity-25 bg-white h-full -translate-y-1/2">
          <p className="text-center bg-[#e5e5e5] text-lg py-5 absolute top-1/2 w-full">
            Out of Stock
          </p>
        </div>
      )}
      <div className="p-5">
        <img src={product.images.i1} alt="Product Image" className="w-full" />
      </div>
      <h2 className="text-sm lg:text-base font-medium leading-5 text-black">
        {product.name.slice(0, 42)}
        <span className="text-xl">{product.name.length > 42 && `...`}</span>
      </h2>
      <ul className="mt-2 text-xs 2xl:text-sm text-[#666]">
        {productFeatures.map((f, i) => (
          <li
            key={i + 1}
            className="mb-2 leading-5 font-extralight list-disc ml-4"
          >
            {f.slice(0, 28)}
            {f.length > 28 && `...`}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 mt-3 pr-6">
        <div className="flex items-center gap-2">
          <p className="line-through text-gray font-medium text-sm md:text-xs 2xl:text-base">
            {product.price}Tk
          </p>
          <p className="text-primary font-semibold text-sm md:text-xs 2xl:text-base">
            {product.price}Tk
          </p>
        </div>
        <p className="text-sm md:text-xs 2xl:text-base text-[#009a00]">
          {product.status && "In Stock"}
        </p>
      </div>
      <GridCardButton status={product.status} />
    </div>
  );
};

export default GridProductCard;

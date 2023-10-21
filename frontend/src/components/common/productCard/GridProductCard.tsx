/* eslint-disable @next/next/no-img-element */
import { IProducts } from "@/types/productTypes/productsTypes";
import React from "react";
import GridAddToCartBtn from "../buttons/GridAddToCardBtn";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import GridAddToWishlistBtn from "../buttons/GridAddToWishlistBtn";
import Image from "next/image";

const GridProductCard = ({ product }: { product: IProducts }) => {
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
        <Image
          width={400}
          height={400}
          src={product.images.i1}
          alt="Product Image"
          className="w-full"
        />
      </div>
      <Tooltip title="View Details">
        <Link href={""}>
          <h2 className="text-sm lg:text-base font-medium leading-5 text-black hover:text-primary duration-300 h-[55px] flex items-start">
            <span className="mt-0">
              {product.name.slice(0, 42)}
              <span className="text-xl">
                {product.name.length > 42 && `...`}
              </span>
            </span>
          </h2>
        </Link>
      </Tooltip>
      <ul className="mt-2 text-xs 2xl:text-sm text-[#666]">
        {productFeatures.map((f, i) => (
          <li
            key={i + 1}
            className="mb-2 leading-5 font-extralight list-disc ml-4"
          >
            {f.slice(0, 25)}
            {f.length > 25 && `...`}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 mt-3 pr-6">
        <div className="flex items-center gap-2">
          <p className="line-through text-gray font-medium text-sm 2xl:text-base">
            {product.price}Tk
          </p>
          <p className="text-primary font-semibold text-sm 2xl:text-base">
            {product.price}Tk
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GridAddToWishlistBtn />
          <GridAddToCartBtn status={product.status} />
        </div>
      </div>
    </div>
  );
};

export default GridProductCard;

/* eslint-disable @next/next/no-img-element */
import { IProducts } from "@/types/productTypes/productsTypes";
import React from "react";
import GridAddToCartBtn from "../buttons/GridAddToCardBtn";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import GridAddToWishlistBtn from "../buttons/GridAddToWishlistBtn";
import Image from "next/image";
import errorImage from "@/assets/image-placeholder.jpg";
import ListCardAddBtn from "../buttons/ListCardAddBtn";
import { useRouter } from "next/router";

const ListProductCard = ({ product }: { product: IProducts }) => {
  const router = useRouter();
  const { category } = router.query;

  const { features } = product;
  const productFeatures = [features.f2, features.f3, features.f4, features.f5];
  return (
    <div className="relative w-full flex flex-col md:flex-row items-center gap-4 mb-6">
      <div className="p-5 w-4/5 md:w-[20%]">
        <Image
          width={400}
          height={400}
          src={product.images.i1}
          alt="Product Image"
          className="w-full"
          // loading="lazy"
          priority
          onError={(e: any) => {
            e.target.src = errorImage.src;
          }}
        />
      </div>
      <div className="w-full md:w-[80%]">
        <Tooltip title="View Details">
          <Link href={`/products/${product._id}`}>
            <h2 className="text-sm font-medium leading-6 text-black hover:text-primary duration-300 flex items-start h-[45px] overflow-hidden">
              {product.name}
            </h2>
          </Link>
        </Tooltip>
        <ul className="mt-2 text-xs 2xl:text-sm text-[#666]">
          {productFeatures.map((f, i) => (
            <div key={i}>
              <li
                className="block md:hidden mb-2 leading-5 font-normal list-disc ml-4"
                style={{ whiteSpace: "nowrap" }}
              >
                {f.length > 25 ? f.slice(0, 25) + "..." : f}
              </li>
              <li
                className="hidden md:block mb-2 leading-5 font-normal list-disc ml-4"
                style={{ whiteSpace: "nowrap" }}
              >
                {f}
              </li>
            </div>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-2 mt-3 md:pr-6">
          <div className="flex items-center gap-2">
            <p className="line-through text-gray font-medium text-sm 2xl:text-base">
              {product.price}Tk
            </p>
            <p className="text-primary font-semibold text-sm 2xl:text-base">
              {Math.floor(product.discountedPrice)}Tk
            </p>
          </div>
          <ListCardAddBtn param={category as string} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ListProductCard;

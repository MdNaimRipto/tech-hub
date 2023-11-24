import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IAllProducts } from "@/types/productTypes/productsTypes";

interface ISearchResult {
  searchResult: IAllProducts[];
  setSearchKey: any;
  setSearchBarVisible?: any;
  maxHeight: string;
}

const SearchResults = ({
  searchResult,
  setSearchKey,
  setSearchBarVisible,
  maxHeight,
}: ISearchResult) => {
  return (
    <div className={`${searchResult.length ? "relative" : "hidden"}`}>
      <div
        className="absolute w-full bg-white overflow-auto"
        style={{
          maxHeight: maxHeight,
        }}
      >
        {searchResult.map(result => (
          <div key={result._id} className="flex items-center gap-5 py-3 px-5">
            <Image
              src={result.images.i1}
              alt="Search Result Product Image"
              width={70}
              height={70}
              priority
            />
            <div className="">
              <Link
                onClick={() => {
                  setSearchKey(null);
                  setSearchBarVisible(false);
                }}
                href={`/products/${result._id}`}
                className="mb-3 block text-black text-sm font-medium hover:text-primary duration-300 leading-6"
              >
                {result.name}
              </Link>
              <div className="flex items-center gap-3">
                <p className="text-sm text-primary">
                  {result.discountedPrice} Tk
                </p>
                <p className="text-sm font-medium">
                  {result.status ? (
                    <span className="text-green">In Stock</span>
                  ) : (
                    <span className="text-red">Out of Stock</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

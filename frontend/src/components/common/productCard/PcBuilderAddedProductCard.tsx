import { IProducts } from "@/types/productTypes/productsTypes";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PcBuilderOptions } from "@/components/pcBuilderComponents/PcBuilderOptions";

const PcBuilderAddedProductCard = ({ product }: { product: IProducts }) => {
  const { products } = PcBuilderOptions();

  // Check if running in the browser environment
  const handleRemove = () => {
    const remaining = products.filter(p => p._id !== product._id);
    window.localStorage.setItem(
      "pc-builder-products",
      JSON.stringify(remaining)
    );
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between mb-8 w-full">
      <div className="flex items-center gap-4">
        <Image
          src={product?.images.i1}
          alt={`PC Builder ${product?.category} Image`}
          width={80}
          height={80}
          className="w-[40px] h-[40px] md:w-[80px] md:h-[80px]"
        />
        <div>
          <p className="hidden md:block text-xs md:text-sm text-black font-medium mb-1">
            {product.category}
          </p>
          <h2 className="text-black text-xs leading-5 md:text-sm mb-1 md:mb-0">
            {product.name}
          </h2>
          <p className="block md:hidden text-xs md:text-sm font-medium text-black">
            {Math.floor(product.discountedPrice)} Tk
          </p>
        </div>
      </div>
      <div className="w-1/5 md:w-1/2 flex items-center justify-end gap-4 md:gap-6">
        <p className="hidden md:block text-xs md:text-sm font-medium text-black">
          {Math.floor(product.discountedPrice)} Tk
        </p>
        <IconButton
          size="small"
          onClick={handleRemove}
          sx={{ background: "#e2e2e2 !important" }}
        >
          <CloseIcon
            sx={{
              fontSize: {
                xs: "18px",
              },
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default PcBuilderAddedProductCard;

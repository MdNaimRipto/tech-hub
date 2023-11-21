import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import Image from "next/image";
import { toast } from "react-toastify";
import { ICartProducts } from "@/types/cartTypes/cartTypes";

const AddToCartBtn = ({
  title,
  background,
  color,
  hover,
  py,
  product,
}: {
  title: string;
  background: string;
  color: string;
  hover?: string;
  py?: string;
  product: ICartProducts;
}) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: product.quantity,
      })
    );

    // Save to local storage after dispatching addToCart
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.info(
      <div className="flex items-start gap-4">
        <Image
          src={product.product.images.i1}
          width={50}
          height={50}
          priority
          alt="Added Cart Product"
          className="mt-2"
        />
        <div>
          <h6 className="text-sm font-medium text-black mb-2">
            {product.product.name}
          </h6>
          <p className="text-xs font-medium text-black mb-2">
            Total Quantity: {product.quantity}
          </p>
          <p className="text-xs font-medium text-black mb-2">
            Price Total:{" "}
            <span className="text-green">
              {product.product.discountedPrice * product.quantity} Tk
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      sx={{
        paddingX: "20px",
        paddingY: py,
        transition: "300ms",
        fontWeight: 600,
        background: `${background} !important`,
        color: color,
        "&:hover": {
          background: `${hover} !important`,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default AddToCartBtn;

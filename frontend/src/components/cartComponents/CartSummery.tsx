import React from "react";
import { GetCartLength } from "./GetCartLength";
import Link from "next/link";
import { ICartState } from "@/types/cartTypes/cartTypes";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@mui/material";

const CartSummery = ({ cart }: { cart: ICartState }) => {
  const { user } = useUserContext();
  return (
    <div className="w-full flex flex-col items-end justify-end gap-5 pr-8 py-5">
      <div className="border-b border-b-input w-full text-end pb-3 mb-2">
        <p className="text-black mb-3 font-medium text-sm">
          Total Products: {GetCartLength()} Tk
        </p>
        <p className="text-black font-medium text-sm">
          Total Price: {cart.total} Tk
        </p>
      </div>
      <Button
        disabled={!user}
        sx={{
          color: "#ffffff",
          background: "linear-gradient(#f15700, #ff7a1a) !important",
          p: "10px",
          "&:disabled": {
            color: "#686464",
            background: "#e2e2e2 !important",
          },
        }}
      >
        <Link href="/order/placeOrder">Place Order</Link>
      </Button>
    </div>
  );
};

export default CartSummery;

import Link from "next/link";
import React, { useState } from "react";
import { GetCartLength } from "../cartComponents/GetCartLength";
import { ICartState } from "@/types/cartTypes/cartTypes";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { IOrderProducts } from "@/types/orderTypes/orderTypes";
import { useUserContext } from "@/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useOrderProductsMutation } from "@/redux/features/order/orderApis";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { clearCart } from "@/redux/slice/cartSlice";

const OrderSummery = ({ cart }: { cart: ICartState }) => {
  const { user, token } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [orderProducts] = useOrderProductsMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleConfirmOrder = async () => {
    setIsLoading(true);

    const orderedProducts: IOrderProducts[] = cart.list.map(item => ({
      productID: item.product._id,
      quantity: item.quantity,
    }));

    const option = {
      data: {
        userID: user?._id,
        products: orderedProducts,
        totalPrice: cart.total,
      },
      token: token,
    };

    try {
      const res = await orderProducts(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(clearCart());
        router.push("/user/orders");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-end justify-end gap-5 lg:pr-8 py-5">
      <div className="border-b border-b-input flex flex-col lg:flex-row items-center justify-between w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-5 lg:mb-0 w-full">
          <div className="border border-light-gray p-5 w-full cursor-pointer">
            <p className="whitespace-nowrap">
              <input type="radio" checked={true} readOnly /> Cash on Delivery
            </p>
          </div>
          <div className="bg-input p-5 cursor-not-allowed text-gray w-full">
            <p className="whitespace-nowrap">
              <input type="radio" /> Online Payment
            </p>
          </div>
        </div>
        <div className="w-full text-end pb-3 mb-2">
          <p className="text-black mb-4 text-sm font-medium">
            Total Products: {GetCartLength()}
          </p>
          <p className="text-black mb-4 text-sm font-medium">
            Sub Total: {cart.total} Tk
          </p>
          <p className="text-black mb-4 text-sm font-medium">
            Delivery Charge: 60 Tk
          </p>
          <p className="text-black font-medium text-sm">
            Total Price: {cart.total + 60} Tk
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-black font-medium">
          <input type="checkbox" checked={true} readOnly /> Terms & Conditions
        </p>
        <Link href="/order/placeOrder">
          <Button
            onClick={handleConfirmOrder}
            sx={{
              color: "#ffffff",
              background: "linear-gradient(#f15700, #ff7a1a) !important",
              p: "10px",
            }}
          >
            {isLoading ? (
              <CircularProgress
                sx={{ color: "#ffffff", marginLeft: 1 }}
                size={24}
              />
            ) : (
              "Confirm Order"
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummery;

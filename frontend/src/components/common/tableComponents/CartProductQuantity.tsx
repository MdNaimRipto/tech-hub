import { TableCell } from "@mui/material";
import { updateQuantity } from "@/redux/slice/cartSlice";
import { ICartProducts } from "@/types/cartTypes/cartTypes";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const CartProductQuantity = ({ cart }: { cart: ICartProducts }) => {
  const { product, quantity } = cart;
  const [productQuantity, setProductQuantity] = useState(quantity);

  const dispatch = useDispatch();

  const handleIncrease = () => {
    setProductQuantity(prevQuantity => prevQuantity + 1);
    dispatch(
      updateQuantity({ id: product?._id, productQuantity: productQuantity + 1 })
    );
  };

  const handleDecrease = () => {
    if (productQuantity > 1) {
      setProductQuantity(prevQuantity => prevQuantity - 1);
      dispatch(
        updateQuantity({
          id: product?._id,
          productQuantity: productQuantity - 1,
        })
      );
    } else {
      toast.error("Cannot Set Quantity 0 Or Less!");
    }
  };

  return (
    <TableCell
      component="th"
      scope="row"
      align="center"
      sx={{ whiteSpace: "nowrap" }}
    >
      <div className="flex items-center justify-center gap-2">
        <button className="text-2xl" onClick={handleDecrease}>
          -
        </button>
        <p className="w-8 text-lg">{quantity}</p>
        <button className="text-2xl" onClick={handleIncrease}>
          +
        </button>
      </div>
    </TableCell>
  );
};

export default CartProductQuantity;

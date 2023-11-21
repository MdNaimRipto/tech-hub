import { ICartProducts, ICartState } from "@/types/cartTypes/cartTypes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function GetCartLength() {
  const [cart, setCart] = useState<ICartState>({ list: [], total: 0 });

  const data = useSelector(
    (state: { cart: { list: ICartProducts[]; total: number } }) => {
      return state.cart;
    }
  );
  useEffect(() => {
    setCart(data);
  }, [data]);

  const cartLength = cart.list.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return cartLength;
}

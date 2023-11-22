import { ICartProducts, ICartState } from "@/types/cartTypes/cartTypes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function GetLocalStorageCart() {
  const [cart, setCart] = useState<ICartState>({ list: [], total: 0 });

  const data = useSelector(
    (state: { cart: { list: ICartProducts[]; total: number } }) => {
      return state.cart;
    }
  );
  useEffect(() => {
    setCart(data);
  }, [data]);

  return cart;
}

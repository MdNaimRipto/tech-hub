import { GetLocalStorageCart } from "@/components/cartComponents/GetLocalStorageCart";
import CartTable from "@/components/common/tables/CartTable";
import MainLayout from "@/layouts/MainLayout";
import React, { ReactElement } from "react";

const Cart = () => {
  const data = GetLocalStorageCart();

  return (
    <div className="container my-12">
      <CartTable cart={data} />
    </div>
  );
};

export default Cart;

Cart.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

import { GetLocalStorageCart } from "@/components/cartComponents/GetLocalStorageCart";
import OrderTable from "@/components/common/tables/OrderTable";
import OrderPageLayout from "@/layouts/OrderPageLayout";
import React, { ReactElement } from "react";

const PlaceOrder = () => {
  const data = GetLocalStorageCart();

  return (
    <div className="container px-4">
      <div>
        <h6 className="my-6 text-xl">Order Preview</h6>
        <OrderTable cart={data} />
      </div>
      <div></div>
    </div>
  );
};

export default PlaceOrder;

PlaceOrder.getLayout = function getLayout(page: ReactElement) {
  return <OrderPageLayout>{page}</OrderPageLayout>;
};

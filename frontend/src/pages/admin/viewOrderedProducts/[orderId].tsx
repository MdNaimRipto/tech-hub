import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import OrderDetailsTable from "@/components/common/tables/OrderDetailsTable";
import { useUserContext } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import { useGetOrderDetailsQuery } from "@/redux/features/order/orderApis";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const ViewOrderedProducts = () => {
  const { token } = useUserContext();

  const router = useRouter();
  const id = router.query.orderId;
  const { data, isLoading } = useGetOrderDetailsQuery({ id: id, token: token });

  if (isLoading) {
    return <CommonLoader />;
  }

  const products = data?.data;

  return (
    <div className="container px-4 my-12">
      <OrderDetailsTable products={products} />
    </div>
  );
};

export default ViewOrderedProducts;

ViewOrderedProducts.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

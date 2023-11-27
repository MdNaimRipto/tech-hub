import PaginationComponent from "@/components/adminDashboard/pagination/PaginationComponent";
import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotPermittedMessage from "@/components/common/NotPermittedMessage/NotPermittedMessage";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";
import UserOrderTable from "@/components/common/tables/UserOrderTable";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApis";
import { IUserOrder } from "@/types/orderTypes/orderTypes";
import React, { ReactElement, useState } from "react";

const UserOrders = () => {
  const { user, token } = useUserContext();

  const pageValue = Number(localStorage.getItem("orderPage"));
  const [page, setPage] = useState<number>(pageValue ? pageValue : 1);

  const option = {
    id: user?._id,
    page: `${page}`,
    token: token,
  };

  const { data, isLoading } = useGetUserOrdersQuery(option);

  if (user?.uid === envConfig.admin_uid) {
    return (
      <NotPermittedMessage title="Admin Don't Have The Capability to Place Orders." />
    );
  }

  if (isLoading) {
    return <CommonLoader />;
  }

  setInterval(() => {
    window.location.reload();
  }, 1800000);

  const products = data?.data?.data as IUserOrder[];
  const count = data?.data?.meta?.total;

  if (!products.length) {
    return <NotFoundMessage heightStyle="h-screen" title="No Orders Found" />;
  }

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      <UserOrderTable products={products} />
      <PaginationComponent
        count={count}
        page={page}
        setPage={setPage}
        storageName="orderPage"
      />
    </div>
  );
};

export default UserOrders;

UserOrders.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

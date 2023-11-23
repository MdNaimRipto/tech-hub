import PaginationComponent from "@/components/adminDashboard/pagination/PaginationComponent";
import UserOrderTable from "@/components/common/tables/UserOrderTable";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApis";
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

  const { data, isLoading, refetch } = useGetUserOrdersQuery(option);

  if (user?.uid === envConfig.admin_uid) {
    return <p>{"Admin Don't Have The Capability to Place Orders."}</p>;
  }

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  setInterval(() => {
    window.location.reload();
  }, 180000);

  const products = data?.data?.data;
  const count = data?.data?.meta?.total;

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

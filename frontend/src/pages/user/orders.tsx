import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserOrders = () => {
  return (
    <div className=" h-screen">
      <h2>Orders</h2>
    </div>
  );
};

export default UserOrders;

UserOrders.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

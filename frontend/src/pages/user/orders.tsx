import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserOrders = () => {
  const { user } = useUserContext();

  if (user?.uid === envConfig.admin_uid) {
    return <p>{"Admin Don't Have The Capability to Place Orders."}</p>;
  }

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

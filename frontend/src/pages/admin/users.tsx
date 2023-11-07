import AdminLayout from "@/layouts/AdminLayout";
import React, { ReactElement } from "react";

const Users = () => {
  return <div></div>;
};

export default Users;

Users.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

import PaginationComponent from "@/components/common/adminDashboard/PaginationComponent";
import UserTable from "@/components/common/adminDashboard/tables/UserTable";
import { useUserContext } from "@/context/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetAllUsersQuery } from "@/redux/features/users/usersApi";
import React, { ReactElement, useState } from "react";

const Users = () => {
  const { token } = useUserContext();

  const pageValue = Number(localStorage.getItem("userPage"));
  console.log(pageValue);
  const [page, setPage] = useState<number>(pageValue ? pageValue : 1);
  console.log(page);
  const option = {
    page: `${page}`,
    token: token as string,
  };
  const { data, isLoading } = useGetAllUsersQuery(option);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const users = data.data.data;
  const count = data.data.meta.total;

  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <UserTable users={users} />
      <PaginationComponent
        count={count}
        page={page}
        setPage={setPage}
        storageName="userPage"
      />
    </div>
  );
};

export default Users;

Users.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

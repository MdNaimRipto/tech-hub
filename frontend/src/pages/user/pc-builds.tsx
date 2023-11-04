import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserPcBuilds = () => {
  return (
    <div className="bg-blue h-screen">
      <h2>Pc Builds</h2>
    </div>
  );
};

export default UserPcBuilds;

UserPcBuilds.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

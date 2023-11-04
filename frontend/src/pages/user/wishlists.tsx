import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserWishlists = () => {
  return (
    <div className="bg-yellow h-screen">
      <h2>Wishlists</h2>
    </div>
  );
};

export default UserWishlists;

UserWishlists.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

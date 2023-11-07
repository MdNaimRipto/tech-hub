import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserWishlists = () => {
  const { user } = useUserContext();

  if (user?.uid === envConfig.admin_uid) {
    return <p>{"Admin Don't Have The Capability to Wishlist Products."}</p>;
  }

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

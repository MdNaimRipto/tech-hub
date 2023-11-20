import WishlistTable from "@/components/common/tables/WishlistTable";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useGetWishlistsProductQuery } from "@/redux/features/wishlist/wishlistApi";
import React, { ReactElement } from "react";

const UserWishlists = () => {
  const { user, token } = useUserContext();

  const option = {
    userId: user?._id as string,
    token: token as string,
  };

  const { data, isLoading } = useGetWishlistsProductQuery(option);

  if (user?.uid === envConfig.admin_uid) {
    return <p>{"Admin Don't Have The Capability to Wishlist Products."}</p>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const products = data.data;

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      {products.length ? (
        <WishlistTable products={products} />
      ) : (
        <h2>No Products to Show</h2>
      )}
    </div>
  );
};

export default UserWishlists;

UserWishlists.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

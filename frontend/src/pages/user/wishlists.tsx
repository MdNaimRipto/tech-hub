import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotPermittedMessage from "@/components/common/NotPermittedMessage/NotPermittedMessage";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";
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
    return (
      <NotPermittedMessage title="Admin Don't Have The Capability to Wishlist Products." />
    );
  }

  if (isLoading) {
    return <CommonLoader />;
  }

  const products = data.data;

  if (!products.length) {
    return <NotFoundMessage heightStyle="h-screen" title="Wishlist is Empty" />;
  }

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      <WishlistTable products={products} />
    </div>
  );
};

export default UserWishlists;

UserWishlists.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

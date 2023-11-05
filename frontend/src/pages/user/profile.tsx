import UserInfoAndUpdateInfo from "@/components/userComponents/userProfile/userInfoAndUpdateInfo/UserInfoAndUpdateInfo";
import UserSmallInfo from "@/components/userComponents/userProfile/UserSmallInfo";
import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserProfile = () => {
  const { user, isLoading } = useUserContext();
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="my-12 lg:mx-4">
      <UserSmallInfo user={user} />
      <UserInfoAndUpdateInfo user={user} />
    </div>
  );
};

export default UserProfile;

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

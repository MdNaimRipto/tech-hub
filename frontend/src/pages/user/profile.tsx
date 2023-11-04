import UserProfileLayout from "@/layouts/UserProfileLayout";
import React, { ReactElement } from "react";

const UserProfile = () => {
  return (
    <div className="bg-green h-screen">
      <h2>Profile</h2>
    </div>
  );
};

export default UserProfile;

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

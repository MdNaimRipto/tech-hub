import { IUser } from "@/types/userTypes/userTypes";
import React from "react";
import UserInfoAndUpdateFields from "./UserInfoAndUpdateFields";

const UserInfoAndUpdateInfo = ({
  user,
  token,
}: {
  user: IUser | null;
  token: string | undefined;
}) => {
  return (
    <div className="pt-4 w-full">
      <h4 className="text-lg md:text-2xl mb-4 font-medium text-black">
        Edit or Update Any Field
      </h4>
      <div>
        <UserInfoAndUpdateFields user={user} token={token} />
      </div>
    </div>
  );
};

export default UserInfoAndUpdateInfo;

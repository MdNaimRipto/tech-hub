import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useGetUserBuildsQuery } from "@/redux/features/pc-builds/pcBuildApis";
import { IPcBuild } from "@/types/pc-buildTypes/PcBuildTypes";
import React, { ReactElement } from "react";

const UserPcBuilds = () => {
  const { user, token } = useUserContext();

  const option = {
    id: user?._id,
    token: token,
  };

  const { data, isLoading } = useGetUserBuildsQuery(option);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const builds = data.data;

  console.log(builds);

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      {builds.map((b: IPcBuild) => (
        <h2 key={b._id}>{b.code}</h2>
      ))}
    </div>
  );
};

export default UserPcBuilds;

UserPcBuilds.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

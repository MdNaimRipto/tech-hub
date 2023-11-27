import { useUserContext } from "@/context/AuthContext";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import {
  useDeleteBuildMutation,
  useGetUserBuildsQuery,
} from "@/redux/features/pc-builds/pcBuildApis";
import { IPcBuild } from "@/types/pc-buildTypes/PcBuildTypes";
import React, { ReactElement } from "react";
import PcLogo from "@mui/icons-material/ImportantDevices";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { toast } from "react-toastify";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CommonLoader from "@/components/common/Loaders/commonLoader/CommonLoader";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";

const UserPcBuilds = () => {
  const { user, token } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const option = {
    id: user?._id,
    token: token,
  };

  const {
    data,
    isLoading: getLoading,
    isError,
  } = useGetUserBuildsQuery(option);
  const [deleteBuild] = useDeleteBuildMutation();

  const handleDeleteBuild = async (buildId: string) => {
    setIsLoading(true);
    const option = {
      data: {
        userId: user?._id,
      },
      buildId: buildId,
      token: token,
    };

    try {
      const res = await deleteBuild(option).unwrap();
      toast.success(res.message);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  if (getLoading) {
    return <CommonLoader />;
  }

  if (isError) {
    return <NotFoundMessage heightStyle="h-screen" title="No Build's Found" />;
  }

  const builds = data?.data;

  return (
    <div className="pb-12 lg:pb-0 my-12 lg:mx-4">
      <h2 className="text-xl text-black mb-6">Saved Builds</h2>
      {builds.map((b: IPcBuild) => (
        <div
          key={b._id}
          className="flex items-center justify-between hover:bg-input duration-300 px-3 py-5 rounded overflow-auto"
        >
          <div className="flex items-center gap-4 mr-8 md:mr-0">
            <PcLogo sx={{ fontSize: "30px", color: "#1c1c1c" }} />
            <div>
              <p className="text-black text-sm font-medium mb-1 whitespace-nowrap">
                {b.code}
              </p>
              <p className="text-gray text-sm font-medium mb-1 whitespace-nowrap">
                {b.buildName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <p className="text-black text-sm font-medium mb-1 whitespace-nowrap">
                Date Saved
              </p>
              <p className="text-gray text-sm font-medium mb-1 whitespace-nowrap">
                {b.savedTime}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/user/pc-builds/${b._id}`}>
                <Button
                  sx={{
                    background: "linear-gradient(#f15700, #ff7a1a) !important",
                    color: "white",
                    padding: "8px",
                  }}
                >
                  Details
                </Button>
              </Link>
              <IconButton
                onClick={() => {
                  handleDeleteBuild(b._id);
                }}
                sx={{
                  background: "#e2e2e2 !important",
                }}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: "#ffffff" }} size={24} />
                ) : (
                  <DeleteIcon />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPcBuilds;

UserPcBuilds.getLayout = function getLayout(page: ReactElement) {
  return <UserProfileLayout>{page}</UserProfileLayout>;
};

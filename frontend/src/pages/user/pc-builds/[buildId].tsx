import PcBuilderProductLists from "@/components/pcBuilderComponents/PcBuilderProductLists";
import { useUserContext } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import { useGetBuildsByIdQuery } from "@/redux/features/pc-builds/pcBuildApis";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const BuildDetails = () => {
  const { token } = useUserContext();

  const router = useRouter();
  const id = router.query.buildId;

  const { data, isLoading } = useGetBuildsByIdQuery({ id, token });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const components = [
    "cpu",
    "cooler",
    "motherboard",
    "ram",
    "storage",
    "psu",
    "gpu",
    "casing",
    "monitor",
    "keyboard",
    "mouse",
    "headphone",
  ];

  const build = data.data.build;

  return (
    <div className="container px-4 py-12 lg:w-[60%]">
      <h2 className="text-xl text-black pb-6 mb-8 border-b border-b-input">
        Products of {data.data.buildName}
      </h2>
      {build &&
        components.map((component, index) => (
          <div key={index}>
            {build[component] && (
              <PcBuilderProductLists product={build[component]} />
            )}
          </div>
        ))}
    </div>
  );
};

export default BuildDetails;

BuildDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

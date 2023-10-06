import MainLayout from "@/layouts/MainLayout";
import React, { ReactElement } from "react";

const PcBuilder = () => {
  return (
    <div>
      <h2>PC Builder</h2>
    </div>
  );
};

export default PcBuilder;

PcBuilder.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

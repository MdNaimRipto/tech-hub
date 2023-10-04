import HomeMain from "@/components/home/HomeMain";
import MainLayout from "@/layouts/MainLayout";
import { ReactElement } from "react";

export default function Home() {
  return <HomeMain />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

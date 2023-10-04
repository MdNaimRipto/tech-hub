import MainLayout from "@/layouts/MainLayout";
import Banner from "./Banner";
import GamingZone from "./GamingZone";
import SmallInfo from "./SmallInfo";

const HomeMain = () => {
  return (
    <div className="container xl:px-4">
      <Banner />
      <SmallInfo />
      <GamingZone />
    </div>
  );
};

export default HomeMain;

import Banner from "./banner/Banner";
import FeaturedAccessories from "./featuredAccessories/FeaturedAccessories";
import FlashSaleAndGetApp from "./FlashSaleAndGetApp/FlashSaleAndGetApp";
import GamingZone from "./gamingZone/GamingZone";
import SmallInfo from "./SmallInfo";
import TopSellingProducts from "./topSellingProducts/TopSellingProducts";

const HomeMain = () => {
  return (
    <div className="container xl:px-4">
      <Banner />
      <SmallInfo />
      <GamingZone />
      <TopSellingProducts />
      <FlashSaleAndGetApp />
      <FeaturedAccessories />
    </div>
  );
};

export default HomeMain;

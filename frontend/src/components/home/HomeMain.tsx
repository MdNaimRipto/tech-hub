import Banner from "./banner/Banner";
import FeaturedAccessories from "./featuredAccessories/FeaturedAccessories";
import FlashSaleAndGetApp from "./FlashSaleAndGetApp/FlashSaleAndGetApp";
import GamingZone from "./gamingZone/GamingZone";
import SmallInfo from "./SmallInfo";
import Subscribe from "./Subscribe";
import TopSellingProducts from "./topSellingProducts/TopSellingProducts";

const HomeMain = () => {
  return (
    <div>
      <Banner />
      <SmallInfo />
      <GamingZone />
      <TopSellingProducts />
      <FlashSaleAndGetApp />
      <FeaturedAccessories />
      <Subscribe />
    </div>
  );
};

export default HomeMain;

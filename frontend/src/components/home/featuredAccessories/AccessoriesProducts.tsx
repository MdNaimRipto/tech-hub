import GridSkeletonLoaderCard from "@/components/common/Loaders/GridSkeletonLoaderCard";
import GridProductCard from "@/components/common/productCard/GridProductCard";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import {
  IProducts,
  IProductsByCategoryFilter,
} from "@/types/productTypes/productsTypes";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

const AccessoriesProducts = ({ param }: { param: string }) => {
  const option: IProductsByCategoryFilter = {
    category: param,
    limit: "8",
    sortBy: "discountedPrice",
  };
  const { data, isLoading } = useGetProductsByCategoryQuery(option);
  if (isLoading) {
    return <GridSkeletonLoaderCard />;
  }
  const products = data?.data?.data;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        769: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {products.map((product: IProducts, i: number) => (
        <SwiperSlide key={product._id} className="mt-3">
          <GridProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AccessoriesProducts;

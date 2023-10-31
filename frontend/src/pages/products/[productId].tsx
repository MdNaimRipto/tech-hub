import ProductImages from "@/components/common/productDetails/ProductImages";
import ProductsInfo from "@/components/common/productDetails/ProductsInfo";
import MainLayout from "@/layouts/MainLayout";
import { useGetProductsByIDLQuery } from "@/redux/features/products/productsApi";
import { IProductDetails } from "@/types/productTypes/productsTypes";
import { Breadcrumbs, Link } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import DetailTabs from "@/components/common/productDetails/productDetailTabs/DetailTabs";

const ProductsDetails = () => {
  const router = useRouter();
  const id = router.query.productId;
  console.log(id);
  const { data, isLoading } = useGetProductsByIDLQuery({ id });

  if (isLoading || !data) {
    return <h2>Loading...</h2>;
  }
  const details = data?.data as IProductDetails;

  console.log(details);

  return (
    <div className="container px-4 mt-10 mb-16">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginBottom: "24px",
          fontSize: {
            xs: "14px",
            sm: "16px",
          },
        }}
      >
        <Link underline="hover" color="#1c1c1c" href="/">
          <HomeIcon />
        </Link>
        <Link
          underline="hover"
          color="#1c1c1c"
          href={`/products?category=${details.category}`}
        >
          {details.category.toLocaleLowerCase()}
        </Link>
        <Link
          underline="hover"
          color="#1c1c1c"
          href={`/products/${details._id}`}
        >
          <span className="hidden md:block">
            {details.name.toLocaleLowerCase()}
          </span>
          <span className="block md:hidden">
            {details.name.toLocaleLowerCase().slice(0, 20)}...
          </span>
        </Link>
      </Breadcrumbs>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductImages images={details?.images} />
        <ProductsInfo product={details} />
      </div>
      <div>
        <DetailTabs description={details.description} />
      </div>
    </div>
  );
};

export default ProductsDetails;

ProductsDetails.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

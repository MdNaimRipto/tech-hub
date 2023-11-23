import { IProductDetails } from "@/types/productTypes/productsTypes";
import { Rating } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import AddToCartBtn from "@/components/common/buttons/AddToCartBtn";
import { useState } from "react";
import GridAddToWishlistBtn from "@/components/common/buttons/GridAddToWishlistBtn";

const ProductsInfo = ({ product }: { product: IProductDetails }) => {
  const {
    _id,
    brand,
    discountedPrice,
    features,
    name,
    price,
    status,
    images,
    rating,
  } = product;
  const { f1, f2, f3, f4, f5 } = features;

  const [totalProduct, setTotalProduct] = useState(1);

  console.log(rating);

  return (
    <div className="my-8">
      <h2 className="text-lg md:text-xl xl:text-2xl font-medium sm:leading-8 xl:leading-10 text-black mb-5">
        {name}
      </h2>
      <div className="flex items-center gap-4 text-xs font-medium mt-3 flex-wrap">
        <p className="px-3 py-2 rounded-full bg-input">
          Status:{" "}
          {status ? (
            <span className="text-green">In Stock</span>
          ) : (
            <span className="text-red">Out of Stock</span>
          )}
        </p>
        <p className="px-3 py-2 rounded-full bg-input">
          Price: <span className="line-through text-gray">{price} Taka</span>
        </p>
        <p className="px-3 py-2 rounded-full bg-input">
          Discounted Price:{" "}
          <span className="text-secondary">{discountedPrice} Taka</span>
        </p>
        <p className="px-3 py-2 rounded-full bg-input">
          Brand: <span>{brand.toUpperCase()}</span>
        </p>
        <div className="px-3 py-2 rounded-full bg-input flex items-center">
          Rating:{" "}
          <Rating
            value={rating}
            icon={<StarRoundedIcon sx={{ fontSize: "20px" }} />}
            emptyIcon={<StarOutlineRoundedIcon sx={{ fontSize: "20px" }} />}
            readOnly
          />
        </div>
      </div>
      <div className="my-4">
        <h6 className="text-lg mb-3">Highlighted Features:</h6>
        <ul className="ml-6">
          <li className="mb-3 text-sm list-disc">{f1}</li>
          <li className="mb-3 text-sm list-disc">{f2}</li>
          <li className="mb-3 text-sm list-disc">{f3}</li>
          <li className="mb-3 text-sm list-disc">{f4}</li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-2xl">
          <button
            onClick={() => {
              setTotalProduct(totalProduct =>
                totalProduct > 1 ? totalProduct - 1 : 1
              );
            }}
          >
            -
          </button>
          <p className="border border-input text-sm md:text-base px-3 md:px-10 py-1">
            {totalProduct}
          </p>
          <button
            onClick={() => {
              setTotalProduct(totalProduct => totalProduct + 1);
            }}
          >
            +
          </button>
        </div>
        <GridAddToWishlistBtn status={status} productID={_id} />
        <AddToCartBtn
          title="Add to Cart"
          background="linear-gradient(#f15700, #ff7a1a)"
          color="#ffffff"
          py="10px"
          product={{
            product: {
              _id,
              name,
              discountedPrice,
              status,
              images: {
                i1: images.i1,
              },
            },
            quantity: totalProduct,
          }}
        />
      </div>
    </div>
  );
};

export default ProductsInfo;

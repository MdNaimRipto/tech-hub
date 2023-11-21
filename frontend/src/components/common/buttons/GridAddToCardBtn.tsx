import { Tooltip, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useUserContext } from "@/context/AuthContext";
import { envConfig } from "@/config/envConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { ICartProducts } from "@/types/cartTypes/cartTypes";
import { toast } from "react-toastify";
import Image from "next/image";

const GridAddToCardBtn = ({
  status,
  product,
}: {
  status: boolean;
  product: ICartProducts;
}) => {
  const { user } = useUserContext();

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    // Save to local storage after dispatching addToCart
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.info(
      <div className="flex items-start gap-4">
        <Image
          src={product.product.images.i1}
          width={50}
          height={50}
          priority
          alt="Added Cart Product"
          className="mt-2"
        />
        <div>
          <h6 className="text-sm font-medium text-black mb-2">
            {product.product.name}
          </h6>
          <p className="text-xs font-medium text-black mb-2">
            Total Quantity: {product.quantity}
          </p>
          <p className="text-xs font-medium text-black mb-2">
            Price Total:{" "}
            <span className="text-green">
              {product.product.discountedPrice * product.quantity} Tk
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <IconButton
      onClick={handleAddToCart}
      aria-label="cart"
      sx={{
        background:
          "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
        color: "#ffffff",
        "&:disabled": {
          color: "#686464",
          background: "#e2e2e2 !important",
        },
        borderRadius: "4px",
      }}
      disabled={!status || user?.uid === envConfig.admin_uid}
    >
      <Tooltip title="Add To Cart">
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: {
              xs: "20px",
              sm: "20px",
              md: "20px",
              lg: "20px",
              xl: "24px",
            },
          }}
        />
      </Tooltip>
    </IconButton>
  );
};

export default GridAddToCardBtn;

import { Tooltip, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";
import {
  useAddToWishlistMutation,
  useGetWishlistsProductQuery,
} from "@/redux/features/wishlist/wishlistApi";
import { IWishlistProduct } from "@/types/wishlistTypes/wishlistsType";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IWishlist {
  status: boolean;
  productID: string;
}

const GridAddToWishlistBtn = ({ status, productID }: IWishlist) => {
  const { user, token } = useUserContext();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const option = {
    userId: user?._id as string,
    token: token as string,
  };

  const { data, isLoading } = useGetWishlistsProductQuery(option);

  const [addToWishlists] = useAddToWishlistMutation();

  if (isLoading || !data) {
    return (
      <IconButton aria-label="wishlist" disabled>
        <FavoriteBorderOutlinedIcon
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
      </IconButton>
    );
  }

  const products = data?.data;

  const isExists = products?.find(
    (p: IWishlistProduct) => p?.productID?._id === productID
  );

  const handleAddToWishlist = async () => {
    setLoading(true);
    const option = {
      data: {
        userID: user?._id,
        productID: productID,
      },
      token: token,
    };

    try {
      const res = await addToWishlists(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push("/user/wishlists");
        setLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setLoading(false);
    }
  };
  return (
    <>
      {isExists ? (
        <IconButton
          aria-label="wishlist"
          sx={{ background: "#ff000040 !important" }}
          disabled
        >
          <FavoriteIcon
            sx={{
              fontSize: {
                xs: "20px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "24px",
              },
              color: "#ff1313e6",
            }}
          />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleAddToWishlist}
          aria-label="wishlist"
          disabled={!status || user?.uid === envConfig.admin_uid}
        >
          {loading ? (
            <CircularProgress
              sx={{ color: "#ffffff", marginLeft: 1 }}
              size={24}
            />
          ) : (
            <Tooltip title="Add To Wishlist">
              <FavoriteBorderOutlinedIcon
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
          )}
        </IconButton>
      )}
    </>
  );
};

export default GridAddToWishlistBtn;

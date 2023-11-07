import { Tooltip, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { envConfig } from "@/config/envConfig";
import { useUserContext } from "@/context/AuthContext";

const GridAddToWishlistBtn = ({ status }: { status: boolean }) => {
  const { user } = useUserContext();
  return (
    <IconButton
      aria-label="wishlist"
      disabled={!status || user?.uid === envConfig.admin_uid}
    >
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
    </IconButton>
  );
};

export default GridAddToWishlistBtn;

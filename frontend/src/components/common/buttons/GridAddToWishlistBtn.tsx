import { Tooltip, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const GridAddToWishlistBtn = () => {
  return (
    <Tooltip title="Add To Wishlist">
      <IconButton aria-label="wishlist">
        <FavoriteBorderOutlinedIcon className="text-xl 2xl:text-2xl" />
      </IconButton>
    </Tooltip>
  );
};

export default GridAddToWishlistBtn;

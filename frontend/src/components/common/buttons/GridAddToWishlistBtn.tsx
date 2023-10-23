import { Tooltip, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const GridAddToWishlistBtn = () => {
  return (
    <Tooltip title="Add To Wishlist">
      <IconButton aria-label="wishlist">
        <FavoriteBorderOutlinedIcon
          sx={{
            fontSize: "20px",
            xl: {
              fontSize: "24px",
            },
          }}
        />
      </IconButton>
    </Tooltip>
  );
};

export default GridAddToWishlistBtn;

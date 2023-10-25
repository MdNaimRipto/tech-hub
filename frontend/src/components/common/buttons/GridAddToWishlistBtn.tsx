import { Tooltip, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const GridAddToWishlistBtn = () => {
  return (
    <Tooltip title="Add To Wishlist">
      <IconButton aria-label="wishlist">
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
    </Tooltip>
  );
};

export default GridAddToWishlistBtn;

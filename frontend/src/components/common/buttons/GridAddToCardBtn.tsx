import { Tooltip, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const GridAddToCardBtn = ({ status }: { status: boolean }) => {
  return (
    <IconButton
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
      disabled={!status}
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

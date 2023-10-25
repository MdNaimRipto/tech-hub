import { Tooltip, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const GridAddToCardBtn = ({ status }: { status: boolean }) => {
  return (
    <Tooltip title="Add To Cart">
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
        // className="bg-gradient-to-bl from-secondary to-primary text-white disabled:text-gray disabled:bg-input rounded"
        disabled={!status}
      >
        <ShoppingCartOutlinedIcon
          // className="text-xl 2xl:text-2xl"
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

export default GridAddToCardBtn;

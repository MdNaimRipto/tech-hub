import { Tooltip, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const GridAddToCardBtn = ({ status }: { status: boolean }) => {
  return (
    <Tooltip title="Add To Cart">
      <IconButton
        aria-label="cart"
        className="bg-gradient-to-bl from-secondary to-primary text-white disabled:text-gray disabled:bg-input rounded"
        disabled={!status}
      >
        <ShoppingCartOutlinedIcon className="text-xl 2xl:text-2xl" />
      </IconButton>
    </Tooltip>
  );
};

export default GridAddToCardBtn;

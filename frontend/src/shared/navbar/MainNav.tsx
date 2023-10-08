import Image from "next/image";
import logo from "../../assets/logo.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import Link from "next/link";
import { Button, Tooltip } from "@mui/material";
import AccountMenu from "./AccountMenu";

const MainNav = () => {
  return (
    <div className="bg-[#e7e7e7] sticky top-0 z-50">
      <div className="flex items-center justify-between h-18 py-3 container px-4 xl:px-0">
        <Link href="/" className="h-full w-2/5 md:w-1/5 lg:w-[16%]">
          <Image
            src={logo}
            alt="Website-Logo"
            priority={true}
            className="w-full"
          />
        </Link>
        <div className="w-1/2 hidden lg:block">
          <input
            type="text"
            placeholder="Search Here"
            className="w-full border border-input p-[10px] rounded focus:border-input focus:outline-none cursor-text hover:cursor-pointer"
          />
        </div>
        <div className="hidden lg:flex items-center justify-evenly lg:w-[22%] xl:w-[20%]">
          <Tooltip title="Wishlist">
            <Link href="/">
              <FavoriteBorderIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            <Link href="/">
              <ShoppingBasketOutlinedIcon />
            </Link>
          </Tooltip>
          <AccountMenu />
          <Link href="/pc-builder">
            <Button className="gradient-button p-2 xl:px-4 xl:py-3 font-semibold text-white rounded text-xs xl:text-base">
              PC BUILDER
            </Button>
          </Link>
        </div>
        <div className="block lg:hidden">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default MainNav;

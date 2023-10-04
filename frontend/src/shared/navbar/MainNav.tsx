import Image from "next/image";
import logo from "../../assets/logo.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import Link from "next/link";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { MouseEvent, useState } from "react";
import AccountMenu from "./AccountMenu";

const MainNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between h-18 py-3 container xl:px-4">
      <Link href="/" className="h-full w-[16%]">
        <Image src={logo} alt="WebsiteLogo" className="w-full" />
      </Link>
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search Here"
          className="w-full border border-input p-[10px] rounded focus:border-input focus:outline-none"
        />
      </div>
      <div className="flex items-center justify-evenly w-[20%]">
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
          <Button className="gradient-button px-4 py-[2px] font-semibold text-white rounded">
            PC BUILDER
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;

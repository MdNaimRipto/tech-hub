/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import AccountMenu from "../AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

const ProfileNav = ({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: any;
}) => {
  return (
    <div className="border-b border-b-input bg-white fixed top-0 left-0 w-full z-50">
      <div className="py-3 flex items-center justify-between container px-4">
        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => setSideNavOpen(!sideNavOpen)}
            sx={{
              marginLeft: {
                xs: "0px",
                md: "8px",
                lg: "16px",
              },
              paddingLeft: {
                xs: "0px",
                md: "8px",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" className="w-2/5">
            <Image src={logo} alt="Navbar-logo" className="w-full" priority />
          </a>
        </div>
        <div className="w-[10%] hidden lg:flex items-center justify-between">
          <Tooltip title="Wishlist">
            <Link href="/">
              <FavoriteBorderIcon sx={{ fontSize: "30px" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            <Link href="/">
              <ShoppingBasketOutlinedIcon sx={{ fontSize: "30px" }} />
            </Link>
          </Tooltip>
          <AccountMenu smallIconSize="30px" largeIconSize="30px" />
        </div>
        <div className="block lg:hidden">
          <AccountMenu smallIconSize="30px" largeIconSize="30px" />
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;

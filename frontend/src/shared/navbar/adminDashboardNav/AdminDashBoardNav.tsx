/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import AccountMenu from "../AccountMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const AdminDashBoardNav = ({
  sideNavOpen,
  setSideNavOpen,
}: {
  sideNavOpen: boolean;
  setSideNavOpen: any;
}) => {
  return (
    <div className="border-b border-b-input bg-white sticky top-0 z-50">
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
        <AccountMenu smallIconSize="30px" largeIconSize="30px" />
      </div>
    </div>
  );
};

export default AdminDashBoardNav;

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

const sideNavOptions = [
  {
    icon: <PersonIcon sx={{ fontSize: "24px" }} />,
    name: "My Profile",
    path: "/user/profile",
  },
  {
    icon: <FeaturedPlayListIcon sx={{ fontSize: "24px" }} />,
    name: "My Orders",
    path: "/user/orders",
  },
  {
    icon: <BookmarkBorderIcon sx={{ fontSize: "24px" }} />,
    name: "My Pc Builds ",
    path: "/user/pc-builds",
  },
  {
    icon: <FavoriteBorderIcon sx={{ fontSize: "24px" }} />,
    name: "My Wishlist",
    path: "/user/wishlists",
  },
];

const UserProfileSideNav = ({ sideNavOpen }: { sideNavOpen: boolean }) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className="h-screen pt-8 bg-white">
      <ul className="border-r border-r-input ">
        {sideNavOptions.map((o, i) => (
          <Link
            key={i}
            href={o.path}
            className={`py-3 mb-3  w-full block font-medium ${
              router.pathname === o.path
                ? "bg-gradient-to-bl from-secondary to-primary text-white"
                : "bg-white text-black"
            } ${sideNavOpen ? "pl-6" : "pl-4"} duration-200`}
          >
            <Tooltip title={o.name}>
              <li
                className={`flex items-center gap-4 ${
                  sideNavOpen ? "justify-start" : "justify-center"
                }`}
              >
                {o.icon}
                <span
                  style={{ whiteSpace: "nowrap" }}
                  className={`${
                    sideNavOpen
                      ? "opacity-100 w-full"
                      : "opacity-100 lg:opacity-0 w-full lg:w-0"
                  } duration-200 overflow-hidden`}
                >
                  {o.name}
                </span>
              </li>
            </Tooltip>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileSideNav;

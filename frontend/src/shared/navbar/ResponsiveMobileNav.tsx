/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import PcBuilder from "@mui/icons-material/ImportantDevicesOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useState } from "react";
import ResponsiveSearchPage from "./ResponsiveSearchPage";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const ResponsiveMobileNav = () => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const menuOptions = [
    {
      icon: <FavoriteBorderIcon className="text-lg md:text-xl" />,
      name: "Wishlist",
      path: "/user/wishlists",
    },
    {
      icon: <ShoppingBasketOutlinedIcon className="text-lg md:text-xl" />,
      name: "Cart",
      path: "/cart",
    },
    {
      icon: <PcBuilder className="text-lg md:text-xl" />,
      name: "PcBuilder",
      path: "/pc-builder",
    },
  ];
  return (
    <div className="lg:hidden z-50">
      {searchBarVisible && (
        <ResponsiveSearchPage setSearchBarVisible={setSearchBarVisible} />
      )}
      <div className="grid grid-cols-5 fixed w-full bottom-0 py-[6px] md:py-2 items-center justify-items-center text-white font-semibold gradient-menu z-40">
        <a href="/" className="flex flex-col items-center w-1/5">
          <HomeOutlinedIcon className="text-lg md:text-xl" />
          <p className="text-xs md:text-sm">Home</p>
        </a>
        {menuOptions.map((o, i) => (
          <Link
            key={i}
            href={o.path}
            className="flex flex-col items-center w-1/5"
          >
            <>{o.icon}</>
            <p className="text-xs md:text-sm">{o.name}</p>
          </Link>
        ))}
        <button
          className="flex flex-col items-center w-1/5"
          onClick={() => setSearchBarVisible(true)}
        >
          <SearchSharpIcon className="text-lg md:text-xl" />
          <p className="text-xs md:text-sm">Search</p>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveMobileNav;

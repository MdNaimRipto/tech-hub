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
      icon: <HomeOutlinedIcon sx={{ fontSize: "20px" }} />,
      name: "Home",
      path: "/",
    },
    {
      icon: <FavoriteBorderIcon sx={{ fontSize: "20px" }} />,
      name: "Wishlist",
      path: "/wishlist",
    },
    {
      icon: <ShoppingBasketOutlinedIcon sx={{ fontSize: "20px" }} />,
      name: "Cart",
      path: "/cart",
    },
    {
      icon: <PcBuilder sx={{ fontSize: "20px" }} />,
      name: "PC Builder",
      path: "/pc-builder",
    },
  ];
  return (
    <div className="lg:hidden z-50">
      {searchBarVisible && (
        <ResponsiveSearchPage setSearchBarVisible={setSearchBarVisible} />
      )}
      <div className="flex items-center justify-around fixed bottom-0 w-full py-2 text-white font-semibold gradient-menu z-40">
        {menuOptions.map((o, i) => (
          <Link
            key={i + 1}
            href={o.path}
            className="flex flex-col items-center w-1/5"
          >
            <>{o.icon}</>
            <p className="text-xs">{o.name}</p>
          </Link>
        ))}
        <button
          className="flex flex-col items-center w-1/5"
          onClick={() => setSearchBarVisible(true)}
        >
          <SearchSharpIcon sx={{ fontSize: "20px" }} />
          <p className="text-xs">Search</p>
        </button>
      </div>
    </div>
  );
};

export default ResponsiveMobileNav;

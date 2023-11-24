/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import logo from "@/assets/logo.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import Link from "next/link";
import { Button, Tooltip } from "@mui/material";
import AccountMenu from "../AccountMenu";
import { useGetWishlistsProductQuery } from "@/redux/features/wishlist/wishlistApi";
import { useUserContext } from "@/context/AuthContext";
import { GetCartLength } from "@/components/cartComponents/GetCartLength";
import SearchBar from "./SearchBar";

const MainNav = () => {
  const { user, token } = useUserContext();

  const option = {
    userId: user?._id as string,
    token: token as string,
  };

  const { data, isLoading } = useGetWishlistsProductQuery(option);

  const wishlistProducts = data?.data;

  return (
    <div className="bg-[#e7e7e7] sticky top-0 z-50">
      <div className="flex items-center justify-between h-18 py-3 container px-4 xl:px-0">
        <a href="/" className="h-full w-2/5 md:w-1/5 lg:w-[16%]">
          <Image
            src={logo}
            alt="Website-Logo"
            priority={true}
            className="w-full"
          />
        </a>
        <SearchBar />
        <div className="hidden lg:flex items-center justify-evenly lg:w-[22%] xl:w-[20%]">
          <Tooltip title="Wishlist">
            <Link href="/user/wishlists" className="relative">
              <p className="absolute top-0 -right-1 text-xs bg-secondary text-black rounded-full w-4 h-4 text-center">
                {isLoading || !wishlistProducts ? 0 : wishlistProducts?.length}
              </p>
              <FavoriteBorderIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Cart">
            <Link href="/cart" className="relative">
              <p className="absolute top-0 -right-1 text-xs bg-secondary text-black rounded-full w-4 h-4 text-center">
                {GetCartLength()}
              </p>
              <ShoppingBasketOutlinedIcon />
            </Link>
          </Tooltip>
          <AccountMenu smallIconSize="30px" largeIconSize="24px" />
          <Link href="/pc-builder">
            <Button
              className="gradient-button"
              sx={{
                padding: "10px",
                xl: {
                  padding: "12px",
                  fontSize: "16px",
                },
                fontWeight: "bold",
                color: "white",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              PC BUILDER
            </Button>
          </Link>
        </div>
        <div className="block lg:hidden">
          <AccountMenu smallIconSize="30px" largeIconSize="24px" />
        </div>
      </div>
    </div>
  );
};

export default MainNav;

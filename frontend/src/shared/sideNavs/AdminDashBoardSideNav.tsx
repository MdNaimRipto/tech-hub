import React from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ProductsIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Class";
import QuestionIcon from "@mui/icons-material/Quiz";
import OrderIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

const sideNavOptions = [
  {
    icon: <AddIcon sx={{ fontSize: "24px" }} />,
    name: "Add Products",
    path: "/admin/addProducts",
  },
  {
    icon: <EditIcon sx={{ fontSize: "24px" }} />,
    name: "Edit Products",
    path: "/admin/editProducts",
  },
  {
    icon: <ProductsIcon sx={{ fontSize: "24px" }} />,
    name: "All Products ",
    path: "/admin/allProducts",
  },
  {
    icon: <CategoryIcon sx={{ fontSize: "24px" }} />,
    name: "Category Products",
    path: "/admin/categoryProducts",
  },
  {
    icon: <QuestionIcon sx={{ fontSize: "24px" }} />,
    name: "Product Questions",
    path: "/admin/productQuestions",
  },
  {
    icon: <OrderIcon sx={{ fontSize: "24px" }} />,
    name: "Ordered Products",
    path: "/admin/orderedProducts",
  },
  {
    icon: <PersonIcon sx={{ fontSize: "24px" }} />,
    name: "Users",
    path: "/admin/users",
  },
  {
    icon: <HomeIcon sx={{ fontSize: "24px" }} />,
    name: "Back to Home",
    path: "/",
  },
];

const AdminDashboardSideNav = ({ sideNavOpen }: { sideNavOpen: boolean }) => {
  const router = useRouter();
  return (
    <div className="h-screen pt-8 bg-white">
      <ul className="border-r border-r-input h-full">
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

export default AdminDashboardSideNav;

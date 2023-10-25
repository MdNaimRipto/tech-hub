import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import LaptopIcon from "@mui/icons-material/Laptop";
import ProcessorIcon from "@mui/icons-material/Memory";
import {
  BsMotherboard,
  BsFan,
  BsDeviceSsd,
  BsGpuCard,
  BsPower,
  BsKeyboard,
  BsMouse,
  BsHeadphones,
  BsController,
} from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import { PiHardDrivesBold } from "react-icons/pi";
import { LuPcCase } from "react-icons/lu";
import { GrMonitor } from "react-icons/gr";
import { SiPcgamingwiki } from "react-icons/si";
import Link from "next/link";

const SideNav = () => {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [fixedSideNav, setFixedSideNav] = useState(true);
  const [responsiveStyle, setResponsiveStyle] = useState("");

  // Detect screen size and set sideNavOpen accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        // Mobile and tablet view
        setSideNavOpen(false);
        setFixedSideNav(false);
        setResponsiveStyle("absolute transform -translate-x-1/2 left-1/2");
      } else {
        // Desktop view
        setFixedSideNav(true);
        setSideNavOpen(true);
        setResponsiveStyle("");
      }
    };

    // Initial check
    handleResize();
    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuList = [
    {
      name: "Laptop",
      icon: <LaptopIcon />,
      path: "LAPTOP",
    },
    {
      name: "Processor",
      icon: <ProcessorIcon />,
      path: "CPU",
    },
    {
      name: "CPU Cooler",
      icon: <BsFan />,
      path: "COOLER",
    },
    {
      name: "Motherboard",
      icon: <BsMotherboard />,
      path: "MOTHERBOARD",
    },
    {
      name: "RAM",
      icon: <GiTicket />,
      path: "RAM",
    },
    {
      name: "Storage (HDD & SSD)",
      icon: <PiHardDrivesBold />,
      path: "STORAGE",
    },
    {
      name: "Graphics Card",
      icon: <BsGpuCard />,
      path: "GPU",
    },
    {
      name: "Power Supply",
      icon: <BsPower />,
      path: "PSU",
    },
    {
      name: "Casing",
      icon: <LuPcCase />,
      path: "CASING",
    },
    {
      name: "Monitor",
      icon: <GrMonitor />,
      path: "MONITOR",
    },
    {
      name: "Keyboard",
      icon: <BsKeyboard />,
      path: "KEYBOARD",
    },
    {
      name: "Mouse",
      icon: <BsMouse />,
      path: "MOUSE",
    },
    {
      name: "Headphone",
      icon: <BsHeadphones />,
      path: "HEADPHONE",
    },
    {
      name: "Controller",
      icon: <BsController />,
      path: "CONTROLLER",
    },
    {
      name: "Gaming Console",
      icon: <SiPcgamingwiki />,
      path: "CONSOLE",
    },
  ];

  return (
    <div
      className={`w-[96%] lg:w-full xl:w-[30%] z-10 ${responsiveStyle}  ${
        sideNavOpen && "h-full"
      }`}
    >
      <Button
        sx={{
          width: "100%",
          background: "linear-gradient(to bottom, #f15700, #ff7a1a) !important",
          borderRadius: 0,
          py: {
            sx: "8px",
            sm: "8px",
            md: "8px",
            lg: "12px",
            xl: "12px",
          },
          color: "#ffffff",
          fontWeight: "bold",
          "&.Mui-disabled": {
            color: "#ffffff",
          },
        }}
        disabled={fixedSideNav}
        onClick={() => setSideNavOpen(!sideNavOpen)}
      >
        All Categories
      </Button>
      <ul
        className={`${
          !sideNavOpen
            ? "h-0 opacity-0"
            : "h-screen md:h-full xl:h-[90%] opacity-100"
        } duration-300 absolute w-full xl:w-[20%] bg-[#fff] side-nav-scroll px-4`}
      >
        {menuList.map((list, i) => (
          <li
            key={i + 1}
            className="py-3 mb-1 w-full text-[#252525] font-medium cursor-pointer hover:text-secondary duration-300"
          >
            <Link
              href={`/products?category=${list.path}`}
              className="flex items-center gap-3"
            >
              <>{list.icon}</>
              <p>{list.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;

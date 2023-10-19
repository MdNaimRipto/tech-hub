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

const SideNav = () => {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [fixedSideNav, setFixedSideNav] = useState(true);
  const [responsiveStyle, setResponsiveStyle] = useState("");

  // Detect screen size and set sideNavOpen accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1025) {
        // Mobile and tablet view
        setSideNavOpen(false);
        setFixedSideNav(false);
        setResponsiveStyle("absolute transform -translate-x-1/2 left-1/2");
      } else {
        // Desktop view
        setFixedSideNav(true);
        setSideNavOpen(true);
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
    },
    {
      name: "Processor",
      icon: <ProcessorIcon />,
    },
    {
      name: "CPU Cooler",
      icon: <BsFan />,
    },
    {
      name: "Motherboard",
      icon: <BsMotherboard />,
    },
    {
      name: "RAM",
      icon: <GiTicket />,
    },
    {
      name: "Hard Disk (HDD)",
      icon: <PiHardDrivesBold />,
    },
    {
      name: "SSD",
      icon: <BsDeviceSsd />,
    },
    {
      name: "Graphics Card",
      icon: <BsGpuCard />,
    },
    {
      name: "Power Supply",
      icon: <BsPower />,
    },
    {
      name: "Casing",
      icon: <LuPcCase />,
    },
    {
      name: "Monitor",
      icon: <GrMonitor />,
    },
    {
      name: "Keyboard",
      icon: <BsKeyboard />,
    },
    {
      name: "Mouse",
      icon: <BsMouse />,
    },
    {
      name: "Headphone",
      icon: <BsHeadphones />,
    },
    {
      name: "Controller",
      icon: <BsController />,
    },
    {
      name: "Gaming Console",
      icon: <SiPcgamingwiki />,
    },
  ];

  return (
    <div
      className={`w-[96%] lg:w-full xl:w-[30%] z-10 ${responsiveStyle}  ${
        sideNavOpen && "h-full"
      }`}
    >
      <Button
        className="w-full bg-gradient-to-bl from-secondary to-primary rounded-none py-2 xl:py-3 text-white font-semibold disabled:text-white"
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
            className="py-3 mb-1 w-full text-[#252525] font-medium cursor-pointer flex items-center gap-3 hover:text-secondary"
          >
            <>{list.icon}</>
            <p>{list.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;

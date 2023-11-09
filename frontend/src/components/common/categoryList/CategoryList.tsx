import LaptopIcon from "@mui/icons-material/Laptop";
import ProcessorIcon from "@mui/icons-material/Memory";
import {
  BsMotherboard,
  BsFan,
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

export const categoryList = [
  {
    name: "Laptop",
    icon: <LaptopIcon />,
    value: "LAPTOP",
  },
  {
    name: "Processor",
    icon: <ProcessorIcon />,
    value: "CPU",
  },
  {
    name: "CPU Cooler",
    icon: <BsFan />,
    value: "COOLER",
  },
  {
    name: "Motherboard",
    icon: <BsMotherboard />,
    value: "MOTHERBOARD",
  },
  {
    name: "RAM",
    icon: <GiTicket />,
    value: "RAM",
  },
  {
    name: "Storage (HDD & SSD)",
    icon: <PiHardDrivesBold />,
    value: "STORAGE",
  },
  {
    name: "Graphics Card",
    icon: <BsGpuCard />,
    value: "GPU",
  },
  {
    name: "Power Supply",
    icon: <BsPower />,
    value: "PSU",
  },
  {
    name: "Casing",
    icon: <LuPcCase />,
    value: "CASING",
  },
  {
    name: "Monitor",
    icon: <GrMonitor />,
    value: "MONITOR",
  },
  {
    name: "Keyboard",
    icon: <BsKeyboard />,
    value: "KEYBOARD",
  },
  {
    name: "Mouse",
    icon: <BsMouse />,
    value: "MOUSE",
  },
  {
    name: "Headphone",
    icon: <BsHeadphones />,
    value: "HEADPHONE",
  },
  {
    name: "Controller",
    icon: <BsController />,
    value: "CONTROLLER",
  },
  {
    name: "Gaming Console",
    icon: <SiPcgamingwiki />,
    value: "CONSOLE",
  },
];

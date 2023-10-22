import { Box } from "@mui/material";
import { BsGpuCard, BsKeyboard, BsMouse, BsFan } from "react-icons/bs";
import { LuPcCase } from "react-icons/lu";
import { FiMonitor } from "react-icons/fi";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const tabes = [
  {
    i: 0,
    t: "Monitor",
    icon: <FiMonitor className="text-sm lg:text-[30px] mx-auto" />,
  },
  {
    i: 1,
    t: "Keyboard",
    icon: <BsKeyboard className="text-sm lg:text-[30px] mx-auto" />,
  },
  {
    i: 2,
    t: "Mouse",
    icon: <BsMouse className="text-sm lg:text-[30px] mx-auto" />,
  },
  {
    i: 3,
    t: "GPU",
    icon: <BsGpuCard className="text-sm lg:text-[30px] mx-auto" />,
  },
  {
    i: 4,
    t: "Cooler",
    icon: <BsFan className="text-sm lg:text-[30px] mx-auto" />,
  },
  {
    i: 5,
    t: "Casing",
    icon: <LuPcCase className="text-sm lg:text-[30px] mx-auto" />,
  },
];

export const tabPanels = [
  {
    i: 0,
    p: "MONITOR",
  },
  {
    i: 1,
    p: "KEYBOARD",
  },
  {
    i: 2,
    p: "MOUSE",
  },
  {
    i: 3,
    p: "GPU",
  },
  {
    i: 4,
    p: "COOLER",
  },
  {
    i: 5,
    p: "CASING",
  },
];

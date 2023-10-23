import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Title from "@/components/common/componentTitle/Title";
import AccessoriesProducts from "./AccessoriesProducts";
import {
  CustomTabPanel,
  TabPanelProps,
  a11yProps,
  tabPanels,
  tabes,
} from "./featuredUtils";

const FeaturedAccessories = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const commonStyle = {
    marginRight: "6px",
    background: "#e2e2e2 !important",
    color: "#1c1c1c",
    fontWeight: 500,
    padding: "12px",
    fontSize: "14px",
    sm: {
      padding: "4px",
      fontSize: "12px",
    },
    "&.Mui-selected": {
      color: "#ffffff",
      background:
        "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
      transitionDuration: "0.4s",
    },
  };
  // const commonClass = `bg-input text-black font-medium p-1 md:p-3 text-xs md:text-sm`;

  return (
    <Box className="w-full mb-16 container px-4">
      <Title
        title={"Featured Accessories"}
        subTitle="Elevate Your Experience with Our Featured Accessories"
      />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {tabes.map(tab => (
            <Tab
              key={tab.i}
              label={
                <div className="p-2">
                  {tab.icon}
                  <p className="font-medium text-[10px] lg:text-sm mt-2">
                    {tab.t}
                  </p>
                </div>
              }
              {...a11yProps(tab.i)}
              sx={commonStyle}
              // className={commonClass}
            />
          ))}
        </Tabs>
      </Box>

      {tabPanels.map(panel => (
        <CustomTabPanel value={value} index={panel.i} key={panel.i}>
          <AccessoriesProducts param={panel.p} />
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default FeaturedAccessories;

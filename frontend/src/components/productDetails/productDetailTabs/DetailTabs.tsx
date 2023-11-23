import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductDescription from "./ProductDescription";
import RatingAndReviews from "./ratingAndReviews/RatingAndReviews";
import ProductQuestions from "./productQuestions/ProductQuestions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailTabs = ({
  description,
  title,
  productId,
}: {
  title: string;
  description: string;
  productId: string;
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const commonStyle = {
    marginRight: "6px",
    background: "#e2e2e2 !important",
    color: "#1c1c1c",
    fontWeight: 500,
    padding: "14px",
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "14px",
      lg: "14px",
      xl: "14px",
    },
    "&.Mui-selected": {
      color: "#ffffff",
      background:
        "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
      transitionDuration: "0.4s",
    },
  };

  return (
    <div className="w-full mb-16 mt-12">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(1)} sx={commonStyle} />
          <Tab label="Reviews" {...a11yProps(0)} sx={commonStyle} />
          <Tab label="Questions" {...a11yProps(2)} sx={commonStyle} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProductDescription description={description} title={title} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RatingAndReviews productId={productId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ProductQuestions productId={productId} />
      </CustomTabPanel>
    </div>
  );
};

export default DetailTabs;

import React from "react";
import { Button } from "@mui/material";

const BuyNowBtn = ({
  title,
  background,
  color,
  hover,
}: {
  title: string;
  background: string;
  color: string;
  hover?: string;
}) => {
  return (
    <Button
      sx={{
        paddingLeft: "20px",
        paddingRight: "20px",
        transition: "300ms",
        fontWeight: 600,
        background: `${background} !important`,
        color: color,
        "&:hover": {
          background: `${hover} !important`,
        },
      }}
      // className={`${colorStyle} px-5 hover:bg-input duration-300 font-semibold`}
    >
      {title}
    </Button>
  );
};

export default BuyNowBtn;

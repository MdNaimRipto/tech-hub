import React from "react";
import { Button } from "@mui/material";

const BuyNowBtn = ({
  title,
  background,
  color,
  hover,
  py,
}: {
  title: string;
  background: string;
  color: string;
  hover?: string;
  py?: string;
}) => {
  return (
    <Button
      sx={{
        paddingX: "20px",
        paddingY: py,
        transition: "300ms",
        fontWeight: 600,
        background: `${background} !important`,
        color: color,
        "&:hover": {
          background: `${hover} !important`,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default BuyNowBtn;

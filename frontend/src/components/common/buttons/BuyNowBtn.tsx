import React from "react";
import { Button } from "@mui/material";

const BuyNowBtn = ({
  title,
  colorStyle,
}: {
  title: string;
  colorStyle: string;
}) => {
  return (
    <Button
      className={`${colorStyle} px-5 hover:bg-input duration-300 font-semibold`}
    >
      {title}
    </Button>
  );
};

export default BuyNowBtn;

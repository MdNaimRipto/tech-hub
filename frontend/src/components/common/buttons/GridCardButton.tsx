import { Button } from "@mui/material";
import React from "react";

const GridCardButton = ({ status }: { status: boolean }) => {
  return (
    <Button
      className="bg-primary text-white w-full py-2 2xl:py-3 mt-3 text-sm hover:bg-input hover:text-primary disabled:text-gray disabled:bg-input"
      disabled={!status}
    >
      Add to Cart
    </Button>
  );
};

export default GridCardButton;

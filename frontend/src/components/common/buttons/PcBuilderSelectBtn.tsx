import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface IBtn {
  path: string;
}

const PcBuilderSelectBtn = ({ path }: IBtn) => {
  return (
    <Link href={path}>
      <Button
        size="large"
        sx={{
          background:
            "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
          color: "#ffffff",
          "&:disabled": {
            color: "#686464",
            background: "#e2e2e2 !important",
          },
          borderRadius: "4px",
        }}
      >
        Select
      </Button>
    </Link>
  );
};

export default PcBuilderSelectBtn;

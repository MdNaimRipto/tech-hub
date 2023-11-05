import React from "react";
import { Button } from "@mui/material";

const UpdateUserInfoBtn = () => {
  return (
    <Button
      sx={{
        background: "#ff7a1a !important",
        color: "#ffffff",
        fontSize: "12px",
        paddingY: "8px",
        "&:hover": {
          background: "#e2e2e2 !important",
          color: "#ff7a1a",
        },
      }}
      type="submit"
    >
      Update
    </Button>
  );
};

export default UpdateUserInfoBtn;

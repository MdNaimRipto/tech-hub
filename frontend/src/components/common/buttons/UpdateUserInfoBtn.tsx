import React from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UpdateUserInfoBtn = ({ isLoading }: { isLoading: boolean }) => {
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
      {isLoading ? (
        <CircularProgress sx={{ color: "#ffffff" }} size={24} />
      ) : (
        "Update"
      )}
    </Button>
  );
};

export default UpdateUserInfoBtn;

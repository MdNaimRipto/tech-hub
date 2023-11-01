import { Button } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const AuthenticationBtn = ({
  title,
  loading,
}: {
  title: string;
  loading: boolean;
}) => {
  return (
    <Button
      type="submit"
      sx={{
        // background: "#2f4eb4 !important",
        background: "linear-gradient(#f15700, #ff7a1a) !important",
        width: "100%",
        color: "#ffffff",
        paddingY: "10px",
        marginTop: "10px",
        borderRadius: "4px",
      }}
    >
      {loading ? (
        <p className="flex items-center justify-center">
          Loading{" "}
          <CircularProgress
            sx={{ color: "#ffffff", marginLeft: 1 }}
            size={24}
          />
        </p>
      ) : (
        `${title}`
      )}
    </Button>
  );
};

export default AuthenticationBtn;

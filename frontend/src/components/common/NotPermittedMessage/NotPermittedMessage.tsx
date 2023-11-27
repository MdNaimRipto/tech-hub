import React from "react";
import WarningIcon from "@mui/icons-material/WarningAmber";

const NotPermittedMessage = ({ title }: { title: string }) => {
  return (
    <div className={`flex items-center justify-center flex-col h-screen`}>
      <WarningIcon
        sx={{
          color: "#F4B618",
          width: "80px",
          height: "80px",
          padding: "10px",
        }}
      />
      <h2 className="text-black font-medium mt-3 mb-1 text-lg">{title}</h2>
    </div>
  );
};

export default NotPermittedMessage;

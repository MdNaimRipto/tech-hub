import React from "react";
import ListIcon from "@mui/icons-material/Assignment";

interface INotFoundMessage {
  heightStyle: string;
  title: string;
  subTitle?: string;
}

const NotFoundMessage = ({
  heightStyle,
  title,
  subTitle,
}: INotFoundMessage) => {
  return (
    <div className={`flex items-center justify-center flex-col ${heightStyle}`}>
      <ListIcon
        sx={{
          color: "#ff7a1a",
          background: "#ffa50054 !important",
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          padding: "10px",
          fontSize: "18px",
        }}
      />
      <h2 className="text-black font-medium mt-3 mb-1 text-lg">{title}</h2>
      <p className="text-black font-medium text-sm">{subTitle}</p>
    </div>
  );
};

export default NotFoundMessage;

import React, { useState } from "react";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { IUser } from "@/types/userTypes/userTypes";
import EditIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";

const UserSmallInfo = ({ user }: { user: IUser | null }) => {
  const [isHovered, setIsHovered] = useState(false);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div className="flex items-center gap-4 border-b border-b-input pb-4 mb-4">
      <IconButton
        component="label"
        sx={{ position: "relative" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar
          alt="User Avatar"
          src={user?.userProfile}
          sx={{
            width: {
              xs: 50,
              sm: 100,
              md: 150,
            },
            height: {
              xs: 50,
              sm: 100,
              md: 150,
            },
            border: "3px solid #219653",
            zIndex: -50,
          }}
        />
        {isHovered && (
          <Tooltip title="Update Profile Picture">
            <div className="absolute left-1/2 -translate-x-1/2 bg-[#00000050] w-[85%] h-[85%] flex items-center justify-center rounded-full opacity-0 hover:opacity-100 duration-300">
              <EditIcon sx={{ color: "#ffffff", fontSize: "40px" }} />
            </div>
          </Tooltip>
        )}
        <VisuallyHiddenInput type="file" accept="image/*" />
      </IconButton>
      <div className="text-black font-medium">
        <span className="text-lg">Welcome</span>
        <h4 className="text-lg md:text-2xl mt-1">{user?.name}</h4>
      </div>
    </div>
  );
};

export default UserSmallInfo;

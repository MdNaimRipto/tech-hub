"use-client";
import React, { useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { IUser } from "@/types/userTypes/userTypes";
import EditIcon from "@mui/icons-material/EditOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useUpdateUserMutation } from "@/redux/features/auth/userApis";
import { envConfig } from "@/config/envConfig";
import { toast } from "react-toastify";

const UserSmallInfo = ({
  user,
  token,
}: {
  user: IUser | null;
  token: string | undefined;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  console.log("IMG-API-KEY:", envConfig.image_api_key);
  console.log("SECRET-KEY:", envConfig.secret_key);
  console.log("admin-uid:", envConfig.admin_uid);
  console.log("ano-uid:", envConfig.anonymous_user_uid);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = event.target.files;

    if (files && files.length > 0) {
      const img = files[0];

      const formData = new FormData();
      formData.append("image", img);

      const imageApiKey = envConfig.image_api_key;
      fetch(`https://api.imgbb.com/1/upload?key=${imageApiKey}`, {
        method: "POST",
        body: formData,
      })
        .then(res => res.json())
        .then(async data => {
          if (data.success) {
            try {
              const option = {
                data: {
                  userProfile: data?.data?.url,
                },
                id: user?._id,
                token: token,
              };
              const res = await updateUser(option).unwrap();
              if (res.success) {
                toast.success(res.message);
                setIsLoading(false);
              }
            } catch (error: any) {
              toast.error(error?.data?.message);
              setIsLoading(false);
            }
          } else {
            toast.error("Something Went Wrong! Try Again");
            setIsLoading(false);
          }
        });
    }
  };

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
            <div className="absolute left-1/2 -translate-x-1/2 bg-[#00000050] w-[90%] h-[90%] flex items-center justify-center rounded-full opacity-0 hover:opacity-100 duration-300">
              <EditIcon sx={{ color: "#ffffff", fontSize: "40px" }} />
            </div>
          </Tooltip>
        )}

        {isLoading && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-[#00000050] w-[85%] h-[85%] flex items-center justify-center rounded-full opacity-100 duration-300">
            <CircularProgress sx={{ color: "#ffffff" }} size={40} />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          name="userProfile"
          id="userProfile"
          onChange={handleFileChange}
          multiple={false}
          style={{
            clip: "rect(0 0 0 0)",
            clipPath: "inset(50%)",
            height: 1,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            whiteSpace: "nowrap",
            width: 1,
          }}
        />
      </IconButton>
      <div className="text-black font-medium">
        <span className="text-lg">Welcome</span>
        <h4 className="text-lg md:text-2xl mt-1">{user?.name}</h4>
      </div>
    </div>
  );
};

export default UserSmallInfo;

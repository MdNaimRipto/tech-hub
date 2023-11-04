import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useUserContext } from "@/context/AuthContext";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface IIconSizes {
  smallIconSize: string;
  largeIconSize: string;
}

export default function AccountMenu({
  smallIconSize,
  largeIconSize,
}: IIconSizes) {
  const { user, setUser } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    setAnchorEl(null);
    toast.success("Logout Successful");
  };
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <button
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountCircleOutlinedIcon
            sx={{
              fontSize: {
                xs: smallIconSize,
                md: largeIconSize,
              },
            }}
          />
        </button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user ? (
          <Link href="/user/profile">
            <MenuItem onClick={handleClose}>
              <Avatar src={user.userProfile} /> My Profile
            </MenuItem>
          </Link>
        ) : (
          <MenuItem disabled>
            <Avatar /> My Profile
          </MenuItem>
        )}
        <Divider />
        {!user ? (
          <div>
            <Link href="/authentication/login">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </Link>
            <Link href="/authentication/register">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Register
              </MenuItem>
            </Link>
          </div>
        ) : (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}

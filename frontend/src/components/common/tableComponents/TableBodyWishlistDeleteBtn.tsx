import React, { useState } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "@/context/AuthContext";
import { useDeleteFromWishlistMutation } from "@/redux/features/wishlist/wishlistApi";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const TableBodyWishlistDeleteBtn = ({ id }: { id: string }) => {
  const { user, token } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);

  const [removeFromWishlist] = useDeleteFromWishlistMutation();

  const handleRemoveFromWishlist = async () => {
    setIsLoading(true);
    const option = {
      data: {
        userID: user?._id,
        wishlistId: id,
      },
      token: token,
    };

    try {
      const res = await removeFromWishlist(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };
  return (
    <TableCell component="th" scope="row" align="center">
      {isLoading ? (
        <CircularProgress
          sx={{
            color: "gray",
            marginLeft: 1,
          }}
          size={24}
        />
      ) : (
        <IconButton
          onClick={handleRemoveFromWishlist}
          aria-label="wishlist"
          sx={{ background: "#ff000040 !important" }}
        >
          <Tooltip title="Remove From Wishlist">
            <DeleteIcon
              sx={{
                fontSize: {
                  xs: "20px",
                  sm: "20px",
                  md: "20px",
                  lg: "20px",
                  xl: "24px",
                },
                color: "#ff1313e6",
              }}
            />
          </Tooltip>
        </IconButton>
      )}
    </TableCell>
  );
};

export default TableBodyWishlistDeleteBtn;

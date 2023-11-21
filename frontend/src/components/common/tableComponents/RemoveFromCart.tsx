import React, { useState } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { removeItem } from "@/redux/slice/cartSlice";

const RemoveFromCart = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeItem({ id: id }));
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
          onClick={handleRemove}
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

export default RemoveFromCart;

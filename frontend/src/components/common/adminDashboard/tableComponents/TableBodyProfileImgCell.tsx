import { Avatar, TableCell } from "@mui/material";
import Image from "next/image";
import React from "react";

const TableBodyProfileImgCell = ({ src }: { src: string }) => {
  return (
    <TableCell component="th" scope="row" align="center">
      <Avatar src={src} sx={{ width: 60, height: 60 }} />
    </TableCell>
  );
};

export default TableBodyProfileImgCell;

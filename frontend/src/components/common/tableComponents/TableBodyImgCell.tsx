import { TableCell } from "@mui/material";
import Image from "next/image";
import React from "react";

const TableBodyImgCell = ({ src, style }: { src: string; style?: string }) => {
  return (
    <TableCell component="th" scope="row" align="center">
      <Image
        src={src}
        alt="Product Image"
        width={80}
        height={80}
        priority
        className={style}
      />
    </TableCell>
  );
};

export default TableBodyImgCell;

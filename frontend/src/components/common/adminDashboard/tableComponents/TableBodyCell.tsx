import React from "react";
import { TableCell } from "@mui/material";

const TableBodyCell = ({
  value,
  align,
  style,
}: {
  value: string;
  align: "left" | "center";
  style?: string;
}) => {
  return (
    <TableCell
      component="th"
      scope="row"
      align={align}
      sx={{ whiteSpace: "nowrap" }}
    >
      <p className={style}>{value}</p>
    </TableCell>
  );
};

export default TableBodyCell;

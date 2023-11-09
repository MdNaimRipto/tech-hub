import React from "react";
import { TableCell } from "@mui/material";

const TableBodyCell = ({
  value,
  align,
}: {
  value: string;
  align: "left" | "center";
}) => {
  return (
    <TableCell
      component="th"
      scope="row"
      align={align}
      sx={{ whiteSpace: "nowrap" }}
    >
      {value}
    </TableCell>
  );
};

export default TableBodyCell;

import React from "react";
import { TableRow, TableCell } from "@mui/material";

const TableHeader = ({
  heading,
  align,
}: {
  heading: string;
  align: "left" | "center";
}) => {
  return (
    <TableCell align={align} sx={{ whiteSpace: "nowrap", fontWeight: 500 }}>
      {heading}
    </TableCell>
  );
};

export default TableHeader;

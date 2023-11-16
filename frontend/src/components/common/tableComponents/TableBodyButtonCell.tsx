import { IconButton, TableCell } from "@mui/material";
import Link from "next/link";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const TableBodyButtonCell = ({ id }: { id: string }) => {
  return (
    <TableCell component="th" align="center">
      <Link href={`/admin/editProduct/${id}`}>
        <IconButton sx={{ background: "#e2e2e2" }}>
          <EditIcon />
        </IconButton>
      </Link>
    </TableCell>
  );
};

export default TableBodyButtonCell;

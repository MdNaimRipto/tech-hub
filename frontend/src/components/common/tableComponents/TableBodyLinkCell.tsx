import React from "react";
import { TableCell } from "@mui/material";
import Link from "next/link";

const TableBodyLinkCell = ({
  value,
  link,
  style,
}: {
  value: string;
  link: string;
  style?: string;
}) => {
  return (
    <TableCell
      component="th"
      scope="row"
      align="left"
      sx={{ whiteSpace: "nowrap" }}
    >
      <Link href={link} className={style}>
        <p>{value}</p>
      </Link>
    </TableCell>
  );
};

export default TableBodyLinkCell;

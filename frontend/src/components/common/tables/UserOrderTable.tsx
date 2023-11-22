import React from "react";
import {
  TableBody,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  Paper,
} from "@mui/material";
import TableHeader from "../tableComponents/TableHeader";
import TableBodyCell from "../tableComponents/TableBodyCell";
import { IUserOrder } from "@/types/orderTypes/orderTypes";

const UserOrderTable = ({ products }: { products: IUserOrder[] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "70vh", overflowX: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Order ID" align="center" />
            <TableHeader heading="Order Price" align="center" />
            <TableHeader heading="Ordered Date" align="center" />
            <TableHeader heading="Order Status" align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow
              key={p._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyCell value={p.code} align="center" />
              <TableBodyCell value={`${p.totalPrice}Tk`} align="center" />
              <TableBodyCell
                value={new Date(p.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
                align="center"
              />
              <TableBodyCell
                value={p.progress}
                align="center"
                style={`
                ${p.progress === "Pending" && "bg-yellow"}
                ${p.progress === "Verifying" && "bg-yellow"}
                ${p.progress === "Confirmed" && "bg-green"}
                ${p.progress === "Processing" && "bg-yellow"}
                ${p.progress === "Delivered" && "bg-blue"}
                ${p.progress === "Completed" && "bg-green"}
                ${p.progress === "Canceled" && "bg-error"}
                  text-white rounded-xl w-24 mx-auto py-[2px]`}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserOrderTable;

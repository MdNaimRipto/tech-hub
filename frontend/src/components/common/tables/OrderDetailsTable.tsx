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
import { IOrderDetails } from "@/types/orderTypes/orderTypes";
import TableBodyImgCell from "../tableComponents/TableBodyImgCell";
import TableBodyLinkCell from "../tableComponents/TableBodyLinkCell";

const OrderDetailsTable = ({ products }: { products: IOrderDetails }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "70vh", overflowX: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Product Image" align="left" />
            <TableHeader heading="Product Name" align="left" />
            <TableHeader heading="Product Price" align="center" />
            <TableHeader heading="Product Quantity" align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.products.map(p => (
            <TableRow
              key={p.productID._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyImgCell src={p.productID.images.i1} />
              <TableBodyLinkCell
                value={p.productID.name}
                link={`/products/${p.productID._id}`}
              />
              <TableBodyCell value={`${p.productID.price}Tk`} align="center" />
              <TableBodyCell value={`${p.quantity}`} align="center" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderDetailsTable;

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
import TableBodyImgCell from "../tableComponents/TableBodyImgCell";
import TableBodyCell from "../tableComponents/TableBodyCell";
import { IAllProducts } from "@/types/productTypes/productsTypes";

const ProductTable = ({ products }: { products: IAllProducts[] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "100vh", overflowX: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Product Image" align="left" />
            <TableHeader heading="Product Name" align="left" />
            <TableHeader heading="Product Price" align="center" />
            <TableHeader heading="Discounted Price" align="center" />
            <TableHeader heading="Product Stock" align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow
              key={p._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyImgCell src={p.images.i1} />
              <TableBodyCell value={`${p.name.slice(0, 40)}...`} align="left" />
              <TableBodyCell value={`${p.price}Tk`} align="center" />
              <TableBodyCell value={`${p.discountedPrice}Tk`} align="center" />
              <TableBodyCell
                value={`${p.status ? "In Stock" : "Out of Stock"}`}
                align="center"
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;

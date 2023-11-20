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
import { IWishlistProduct } from "@/types/wishlistTypes/wishlistsType";
import TableBodyImgCell from "../tableComponents/TableBodyImgCell";
import TableBodyWishlistDeleteBtn from "../tableComponents/TableBodyWishlistDeleteBtn";

const WishlistTable = ({ products }: { products: IWishlistProduct[] }) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Product Image" align="left" />
            <TableHeader heading="Product Name" align="left" />
            <TableHeader heading="Product Price" align="center" />
            <TableHeader heading="Status" align="left" />
            <TableHeader heading="Remove Product" align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyImgCell src={p.productID.images.i1} />
              <TableBodyCell value={p.productID.name} align="left" />
              <TableBodyCell value={`${p.productID.price} Tk`} align="center" />
              <TableBodyCell
                value={p.productID.status ? "In Stock" : "Out of Stock"}
                align="left"
              />
              <TableBodyWishlistDeleteBtn id={p._id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WishlistTable;

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
import TableBodyButtonCell from "../tableComponents/TableBodyButtonCell";
import TableBodyLinkCell from "../tableComponents/TableBodyLinkCell";
import { ICartState } from "@/types/cartTypes/cartTypes";
import RemoveFromCart from "../tableComponents/RemoveFromCart";
import { useDispatch } from "react-redux";
import CartProductQuantity from "../tableComponents/CartProductQuantity";

const CartTable = ({ cart }: { cart: ICartState }) => {
  if (!cart?.list?.length) {
    return <h2>Cart is Empty</h2>;
  }
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ minHeight: "50vh", overflowX: "auto" }}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow sx={{ background: "#e2e2e2 !important" }}>
              <TableHeader heading="Product Image" align="left" />
              <TableHeader heading="Product Name" align="left" />
              <TableHeader heading="Product Price" align="center" />
              <TableHeader heading="Product Stock" align="center" />
              <TableHeader heading="Product Quantity" align="center" />
              <TableHeader heading="Remove Product" align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.list?.map(cart => (
              <TableRow
                key={cart.product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableBodyImgCell src={cart.product.images.i1} />
                <TableBodyLinkCell
                  value={`${cart.product.name.slice(0, 40)}...`}
                  id={cart.product._id}
                  style="text-black hover:text-primary duration-300"
                />
                <TableBodyCell
                  value={`${cart.product.discountedPrice}Tk`}
                  align="center"
                />
                <TableBodyCell
                  value={`${cart.product.status ? "In Stock" : "Out of Stock"}`}
                  align="center"
                  style={`${cart.product.status ? "text-green" : "text-red"}`}
                />
                <CartProductQuantity cart={cart} />
                <RemoveFromCart id={cart.product._id} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full">
        <p className="bg-input text-end pr-8 py-5">
          Total Price: {cart.total} Tk
        </p>
      </div>
    </>
  );
};

export default CartTable;

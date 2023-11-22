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
import TableBodyLinkCell from "../tableComponents/TableBodyLinkCell";
import { ICartState } from "@/types/cartTypes/cartTypes";
import OrderSummery from "@/components/orderComponents/OrderSummery";

const OrderTable = ({ cart }: { cart: ICartState }) => {
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
              <TableHeader heading="Product Quantity" align="center" />
              <TableHeader heading="Calculation" align="center" />
              <TableHeader heading="Product Total" align="center" />
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
                  value={`${cart.product.name.slice(0, 50)}...`}
                  link={`/products/${cart.product._id}`}
                  style="text-black hover:text-primary duration-300"
                />
                <TableBodyCell
                  value={`${cart.product.discountedPrice} Tk`}
                  style="text-secondary font-medium"
                  align="center"
                />
                <TableBodyCell value={`${cart.quantity}`} align="center" />
                <TableBodyCell
                  value={`${cart.product.discountedPrice} x ${cart.quantity}`}
                  align="center"
                />
                <TableBodyCell
                  value={`${cart.product.discountedPrice * cart.quantity} Tk`}
                  align="center"
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderSummery cart={cart} />
    </>
  );
};

export default OrderTable;

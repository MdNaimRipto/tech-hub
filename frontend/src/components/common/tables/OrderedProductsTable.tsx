import React, { useState } from "react";
import {
  TableBody,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material";
import TableHeader from "../tableComponents/TableHeader";
import TableBodyCell from "../tableComponents/TableBodyCell";
import { IOrder, OrderProgress } from "@/types/orderTypes/orderTypes";
import TableBodyLinkCell from "../tableComponents/TableBodyLinkCell";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/orderApis";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

const OrderedProductsTable = ({
  products,
  status,
}: {
  products: IOrder[];
  status: OrderProgress;
  setStatus: any;
}) => {
  const { token } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async (status: OrderProgress, id: string) => {
    setIsLoading(true);
    const option = {
      data: {
        status: status,
      },
      id: id,
      token: token,
    };
    try {
      const res = await updateStatus(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "70vh", overflowX: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Order ID" align="center" />
            <TableHeader heading="Ordered User" align="center" />
            <TableHeader heading="Order Price" align="center" />
            <TableHeader heading="Ordered Date" align="center" />
            <TableHeader heading="Current Status" align="center" />
            <TableHeader heading="Update Status" align="center" />
            <TableHeader heading="View Products" align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow
              key={p._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyCell value={p.code} align="center" />
              <TableBodyCell value={p.userID.email} align="center" />
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
              <TableCell
                component="th"
                scope="row"
                align="center"
                sx={{ whiteSpace: "nowrap" }}
              >
                {isLoading ? (
                  "Updating..."
                ) : (
                  <select
                    defaultValue={status}
                    disabled={status === "Completed" || status === "Canceled"}
                    onChange={e => {
                      handleUpdateStatus(
                        e.target.value as OrderProgress,
                        p._id
                      );
                    }}
                    className="border border-light-gray p-2 rounded focus:outline-none cursor-pointer disabled:cursor-not-allowed"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Verifying">Verifying</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                )}
              </TableCell>
              <TableBodyLinkCell
                value="View"
                link={`/admin/viewOrderedProducts/${p._id}`}
                style="w-20 mx-auto block text-white text-center py-2 rounded cursor-pointer bg-primary"
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderedProductsTable;

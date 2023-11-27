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
import { IAllUser } from "@/types/userTypes/userTypes";
import TableBodyProfileImgCell from "../tableComponents/TableBodyProfileImgCell";

const UserTable = ({ users }: { users: IAllUser[] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "70vh", maxHeight: "70vh", overflow: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0, zIndex: 30 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="User Image" align="left" />
            <TableHeader heading="User Name" align="left" />
            <TableHeader heading="User Email" align="left" />
            <TableHeader heading="Contact Number" align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyProfileImgCell src={user.userProfile} />
              <TableBodyCell value={user.name} align="left" />
              <TableBodyCell value={user.email} align="left" />
              <TableBodyCell value={user.contactNumber} align="left" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

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
import TableBodyProfileImgCell from "../tableComponents/TableBodyProfileImgCell";
import { IQuestions } from "@/types/questionsTypes/questionTypes";
import TableBodyLinkCell from "../tableComponents/TableBodyLinkCell";

const QuestionsTable = ({ questions }: { questions: IQuestions[] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: "70vh", maxHeight: "70vh", overflow: "auto" }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0 }}>
          <TableRow sx={{ background: "#e2e2e2 !important" }}>
            <TableHeader heading="Question No." align="center" />
            <TableHeader heading="User Name" align="left" />
            <TableHeader heading="Product Link" align="left" />
            <TableHeader heading="Asked At" align="left" />
            <TableHeader heading="Asked Question" align="left" />
            <TableHeader heading="Answer Question" align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableBodyCell value={`${i + 1}`} align="center" />
              <TableBodyCell value={q.userName} align="left" />
              <TableBodyLinkCell
                value="Click Here"
                link={`/products/${q.productId}`}
                style="text-secondary hover:text-primary duration-300"
              />
              <TableBodyCell
                value={new Date(q.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
                align="left"
              />
              <TableBodyCell value={q.question} align="left" />
              {q.answer === "No Answer Yet!" ? (
                <TableBodyCell value={q.answer} align="center" />
              ) : (
                <TableBodyCell value="Answered" align="center" />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionsTable;

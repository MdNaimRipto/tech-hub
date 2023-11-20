import { Pagination } from "@mui/material";
import React from "react";

interface IPaginationOptions {
  count: number;
  page: number;
  setPage: any;
  storageName: string;
}

const PaginationComponent = ({
  count,
  page,
  setPage,
  storageName,
}: IPaginationOptions) => {
  return (
    <Pagination
      count={Math.ceil(count / 8)}
      page={page}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        localStorage.setItem(storageName, JSON.stringify(value));
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      color="primary"
      sx={{ marginY: "20px" }}
    />
  );
};

export default PaginationComponent;

import React, { ReactElement, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import {
  useGetAllProductsQuery,
  useGetProductsCountQuery,
} from "@/redux/features/products/productsApi";
import {
  TableBody,
  TableHead,
  TableContainer,
  Table,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { IAllProducts } from "@/types/productTypes/productsTypes";
import TableHeader from "@/components/common/tableComponents/TableHeader";
import TableBodyImgCell from "@/components/common/tableComponents/TableBodyImgCell";
import TableBodyCell from "@/components/common/tableComponents/TableBodyCell";

const AllProducts = () => {
  const pageValue = Number(localStorage.getItem("page"));
  console.log(pageValue);
  const [page, setPage] = useState<number>(pageValue ? pageValue : 1);
  console.log(page);
  const option = {
    page: `${page}`,
  };
  const { data, isLoading } = useGetAllProductsQuery(option);
  const { data: count, isLoading: allProductLoading } =
    useGetProductsCountQuery({});

  if (isLoading || allProductLoading) {
    return <h2>Loading...</h2>;
  }

  const products = data.data.data as IAllProducts[];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    localStorage.setItem("page", JSON.stringify(value));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow sx={{ background: "#e2e2e2 !important" }}>
              <TableHeader heading="Product Image" align="left" />
              <TableHeader heading="Product Name" align="left" />
              <TableHeader heading="Product Price" align="center" />
              <TableHeader heading="Discounted Price" align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(p => (
              <TableRow
                key={p._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableBodyImgCell src={p.images.i1} />
                <TableBodyCell
                  value={`${p.name.slice(0, 40)}...`}
                  align="left"
                />
                <TableBodyCell value={`${p.price}Tk`} align="center" />
                <TableBodyCell
                  value={`${p.discountedPrice}Tk`}
                  align="center"
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(count.data / 10)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginY: "20px" }}
      />
    </div>
  );
};

export default AllProducts;

AllProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

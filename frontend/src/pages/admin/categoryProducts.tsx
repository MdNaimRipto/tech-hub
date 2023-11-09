import React, { ReactElement, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
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
import { categoryList } from "@/components/common/categoryList/CategoryList";

const CategoryProducts = () => {
  const pageValue = Number(localStorage.getItem("categoryPage"));
  const [page, setPage] = useState<number>(pageValue ? pageValue : 1);
  const currentCategory = JSON.parse(
    localStorage.getItem("category") as string
  );
  const [category, setCategory] = useState<string>(
    currentCategory && currentCategory !== "" ? currentCategory : "LAPTOP"
  );

  const [sortOrder, setSortOrder] = useState("desc");

  const option = {
    category: category,
    page: `${page}`,
    sortOrder: sortOrder,
  };

  const { data, isLoading } = useGetProductsByCategoryQuery(option);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const products = data.data.data as IAllProducts[];
  const count = data.data.meta.total;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    localStorage.setItem("categoryPage", JSON.stringify(value));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-lg font-medium">Select Filter Options:</h6>
        <div>
          <select
            onChange={e => {
              setSortOrder(e.target.value);
            }}
            className="border border-light-gray p-2 rounded focus:outline-none cursor-pointer mr-3"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
          <select
            className="border border-light-gray p-2 rounded focus:outline-none cursor-pointer"
            defaultValue=""
            onChange={e => {
              setCategory(e.target.value);
              localStorage.setItem("category", JSON.stringify(e.target.value));
              localStorage.setItem("categoryPage", JSON.stringify(1));
              setPage(1);
            }}
          >
            <option value="">Select Category</option>
            {categoryList.map((o, i) => (
              <option key={i} value={o.value}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ minHeight: "100vh" }}>
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
        count={Math.ceil(count / 10)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginY: "20px" }}
      />
    </div>
  );
};

export default CategoryProducts;

CategoryProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

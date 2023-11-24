import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IAllProducts } from "@/types/productTypes/productsTypes";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SearchResults from "@/components/common/searchResults/SearchResults";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState<string | null>(null);

  const option = {
    searchTerm: `${searchKey}`,
    limit: "null",
  };

  const { data, isLoading } = useGetAllProductsQuery(option);

  if (isLoading) {
    return (
      <div className="w-1/2 hidden lg:block">
        <input
          type="text"
          placeholder="Search Here"
          className="w-full border border-input p-[10px] rounded focus:border-input focus:outline-none cursor-text hover:cursor-pointer"
        />
      </div>
    );
  }
  const searchResult = data.data.data as IAllProducts[];

  return (
    <div className="w-1/2 hidden lg:block">
      <div className="relative">
        <input
          type="text"
          onChange={e => {
            setSearchKey(e.target.value !== "" ? e.target.value : null);
          }}
          value={searchKey || ""}
          placeholder="Search Here"
          className="w-full border border-input p-[10px] rounded focus:border-input focus:outline-none cursor-text hover:cursor-pointer"
        />
        <IconButton
          onClick={() => setSearchKey(null)}
          sx={{
            position: "absolute",
            right: 5,
            top: "50%",
            transform: "translateY(-50%)",
            display: `${searchKey !== null ? "block" : "none"}`,
          }}
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </div>
      <SearchResults
        searchResult={searchResult}
        setSearchKey={setSearchKey}
        maxHeight="65vh"
      />
    </div>
  );
};

export default SearchBar;

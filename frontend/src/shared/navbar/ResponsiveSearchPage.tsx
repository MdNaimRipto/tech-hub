import SearchResults from "@/components/common/searchResults/SearchResults";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { IAllProducts } from "@/types/productTypes/productsTypes";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface ResponsiveSearchPageProps {
  setSearchBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResponsiveSearchPage: React.FC<ResponsiveSearchPageProps> = ({
  setSearchBarVisible,
}) => {
  const [searchKey, setSearchKey] = useState<string | null>(null);

  const option = {
    searchTerm: `${searchKey}`,
    limit: "null",
  };

  const { data, isLoading } = useGetAllProductsQuery(option);

  if (isLoading) {
    return <h2>loading...</h2>;
  }
  const searchResult = data.data.data as IAllProducts[];

  return (
    <div className="bg-white z-50 h-screen w-full fixed top-0">
      <div
        className={`flex items-center w-full h-[50px] border border-input bg-white px-2 mt-2`}
      >
        <input
          type="text"
          placeholder="Search Here"
          className={`w-[90%] h-full focus:outline-none`}
          onChange={e => {
            setSearchKey(e.target.value !== "" ? e.target.value : null);
          }}
          value={searchKey || ""}
        />
        <button
          onClick={() => {
            setSearchBarVisible(false);
          }}
          className="w-[10%]"
        >
          <CloseIcon sx={{ color: "gray" }} />
        </button>
      </div>
      <SearchResults
        searchResult={searchResult}
        setSearchKey={setSearchKey}
        setSearchBarVisible={setSearchBarVisible}
        maxHeight="85vh"
      />
    </div>
  );
};

export default ResponsiveSearchPage;

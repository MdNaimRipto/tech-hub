import { IProducts } from "@/types/productTypes/productsTypes";
import { IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListProductCard from "@/components/common/productCard/ListProductCard";
import PcBuilderProductsLayout from "@/layouts/PcBuilderProductsLayout";
import NotFoundMessage from "@/components/common/notFoundMessage/NotFoundMessage";

interface IProductsContent {
  setIsSideBarOpen: any;
  isSideBarOpen: boolean;
  products: IProducts[];
  category: string;
  setFilterValues: any;
  isError: boolean;
}

const PcBuilderProducts = ({
  setIsSideBarOpen,
  isSideBarOpen,
  products,
  category,
  setFilterValues,
  isError,
}: IProductsContent) => {
  return (
    <div className="lg:ml-4 lg:mt-5">
      <div className="flex items-center justify-between pb-4 mb-6 w-full border-b border-b-input">
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: "12px" }}>
          <Link underline="hover" color="#1c1c1c" href="/">
            <HomeIcon />
          </Link>
          <Link
            underline="hover"
            color="#1c1c1c"
            href={`/products?category=${category}`}
          >
            {category.toLocaleLowerCase()}
          </Link>
        </Breadcrumbs>
        <select
          onChange={e => {
            const selectedValue = e.target.value;
            setFilterValues((prevFilterValues: any) => ({
              ...prevFilterValues,
              sortOrder: selectedValue,
            }));
          }}
          className="w-[55%] md:w-1/5 border border-light-gray p-2 cursor-pointer focus:outline-none"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      {!isError && products?.length ? (
        <div className="grid grid-cols-1 gap-4">
          {products?.map((product: IProducts, i: number) => (
            <ListProductCard product={product} key={i} />
          ))}{" "}
        </div>
      ) : (
        <NotFoundMessage
          heightStyle="h-screen"
          title="No Product Found"
          subTitle="Please adjust your filter"
        />
      )}
      <div className="lg:hidden">
        <IconButton
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          sx={{
            position: "fixed",
            bottom: {
              xs: 60,
              sm: 70,
            },
            right: 10,
            background: `${isSideBarOpen ? "red" : "#a9a9a9"}`,
            borderRadius: 1,
            color: "white",
            zIndex: 50,
          }}
        >
          {!isSideBarOpen ? (
            <Tooltip title="Open Side Bar">
              <SettingsIcon
                sx={{
                  animation: "spin 5s linear infinite",
                  transformOrigin: "center",
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Close Side Bar">
              <CloseIcon />
            </Tooltip>
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default PcBuilderProducts;

PcBuilderProducts.getLayout = function getLayout() {
  return <PcBuilderProductsLayout />;
};

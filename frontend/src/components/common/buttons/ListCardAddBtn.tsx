import { Button } from "@mui/material";
import { IProductDetails, IProducts } from "@/types/productTypes/productsTypes";
import { useRouter } from "next/router";

interface IListBtn {
  param: string;
  product: IProducts;
}

const ListCardAddBtn = ({ param, product }: IListBtn) => {
  const router = useRouter();

  let products: IProductDetails[] = [];

  // Check if running in the browser environment
  if (typeof localStorage !== "undefined") {
    const storedProducts = localStorage.getItem("pc-builder-products");
    products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  const isExists = products.find(p => p.category === param);

  const handleAddToPcBuilder = () => {
    const allProducts = [...products, product];
    localStorage.setItem("pc-builder-products", JSON.stringify(allProducts));
    router.push("/pc-builder");
  };

  return (
    <Button
      onClick={handleAddToPcBuilder}
      aria-label="cart"
      sx={{
        background:
          "linear-gradient(to bottom left, #f15700, #ff7a1a) !important",
        color: "#ffffff",
        "&:disabled": {
          color: "#686464",
          background: "#e2e2e2 !important",
        },
        borderRadius: "4px",
      }}
      disabled={Boolean(isExists)}
    >
      Add Product
    </Button>
  );
};

export default ListCardAddBtn;

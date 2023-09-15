import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProduct } from "./products.interface";
import { generateProductCode } from "./products.utils";
import { Products } from "./products.schema";

//* Upload Product Api
const uploadProduct = async (payload: IProduct): Promise<IProduct> => {
  // Saving Product Code
  const code = generateProductCode();
  const isExistsCode = await Products.findOne({ code: code });
  if (isExistsCode) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Product Already Exists! Try Again"
    );
  }
  payload.code = code;

  // Saving Discount Price
  if (payload.discount === 0) {
    payload.discountedPrice = payload.price;
  } else if (payload.discount < 0 || payload.discount > 100) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Discount must be between 0 and 100."
    );
  }
  {
    const discountAmount = (payload.price * payload.discount) / 100;
    const discountPrice = payload.price - discountAmount;
    payload.discountedPrice = discountPrice;
  }

  // Saving all Rating:
  payload.allRating = [0];

  // Save Product
  const product = new Products(payload);
  const result = await product.save();
  return result;
};

//* Get All Products
const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await Products.find();

  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products to Show");
  }
  return products;
};

//* Get Product By Category
const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  const products = await Products.find({ category: category });
  if (products.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Products to Show");
  }

  return products;
};

//* Get Product By ID
const getProductsByID = async (productID: string): Promise<IProduct | null> => {
  const product = await Products.findById({ _id: productID });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Product found");
  }

  return product;
};

// * Update Product
const updateProduct = async (
  productID: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const isExistsProduct = await Products.findById({ _id: productID });
  if (!isExistsProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found!");
  }
};

// * Product Service Export
export const ProductService = {
  uploadProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByID,
};

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProductService } from "./products.service";
import { productsFilterableFields } from "./products.constant";
import { paginationFields } from "../../../constants/pagination.constant";
import pick from "../../../shared/shared";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Upload Product
const uploadProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;
  const token = verifyAuthToken(req);

  await ProductService.uploadProduct(productData, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Uploaded Successfully",
    data: null,
  });
});

// Get All Product
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productsFilterableFields);
  const options = pick(req.query, paginationFields);
  const products = await ProductService.getAllProducts(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product's Retrieved Successfully",
    data: products,
  });
});

// Get Products by Category
const getProductsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { category } = req.query;
    const filters = pick(req.query, productsFilterableFields);
    const options = pick(req.query, paginationFields);
    const products = await ProductService.getProductsByCategory(
      category as string,
      filters,
      options
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Products Retrieved Successfully",
      data: products,
    });
  }
);

// Get Products by ID
const getProductsByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const product = await ProductService.getProductsByID(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Retrieved Successfully",
    data: product,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...productData } = req.body;
  const token = verifyAuthToken(req);

  await ProductService.updateProduct(id, productData, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Updated Successfully",
    data: null,
  });
});

const updateProductRating = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userID, rating } = req.body;
  const token = verifyAuthToken(req);

  await ProductService.updateProductRating(id, userID, rating, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rating Added Successfully",
    data: null,
  });
});

export const ProductController = {
  uploadProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByID,
  updateProduct,
  updateProductRating,
};

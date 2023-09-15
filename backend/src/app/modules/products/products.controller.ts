import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProductService } from "./products.service";

// Upload Product
const uploadProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...productData } = req.body;

  const product = await ProductService.uploadProduct(productData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Uploaded Successfully",
    data: product,
  });
});

// Get All Product
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts();

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
    const { category } = req.query; // Use req.query to access query parameters
    const products = await ProductService.getProductsByCategory(
      category as string
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
  const product = await ProductService.updateProduct(id, productData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Updated Successfully",
    data: product,
  });
});

export const ProductController = {
  uploadProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByID,
  updateProduct,
};

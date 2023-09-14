import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ProductService } from "./products.service";

// User Registration
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

export const ProductController = {
  uploadProduct,
};

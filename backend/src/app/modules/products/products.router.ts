import express from "express";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { ProductValidation } from "./products.validation";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post(
  "/uploadProduct",
  zodValidationRequest(ProductValidation.productsZodSchema),
  ProductController.uploadProduct
);

router.get("/getAllProducts", ProductController.getAllProducts);

router.get("/getProducts", ProductController.getProductsByCategory);

export const ProductsRouter = router;

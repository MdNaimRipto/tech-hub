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

router.get("/getProductByID/:id", ProductController.getProductsByID);

router.patch(
  "/updateProduct/:id",
  zodValidationRequest(ProductValidation.updateProductSchema),
  ProductController.updateProduct
);

router.patch(
  "/updateRating/:id",
  zodValidationRequest(ProductValidation.updateRatingZodSchema),
  ProductController.updateProductRating
);

router.delete("/deleteProduct/:id", ProductController.deleteProduct);

export const ProductsRouter = router;

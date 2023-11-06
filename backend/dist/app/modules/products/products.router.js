"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const products_validation_1 = require("./products.validation");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post("/uploadProduct", (0, zodValidationRequest_1.default)(products_validation_1.ProductValidation.productsZodSchema), products_controller_1.ProductController.uploadProduct);
router.get("/getAllProducts", products_controller_1.ProductController.getAllProducts);
router.get("/getProducts", products_controller_1.ProductController.getProductsByCategory);
router.get("/getTopSellingProducts", products_controller_1.ProductController.getTopSellingProducts);
router.get("/getProductByID/:id", products_controller_1.ProductController.getProductsByID);
router.patch("/updateProduct/:id", (0, zodValidationRequest_1.default)(products_validation_1.ProductValidation.updateProductSchema), products_controller_1.ProductController.updateProduct);
exports.ProductsRouter = router;

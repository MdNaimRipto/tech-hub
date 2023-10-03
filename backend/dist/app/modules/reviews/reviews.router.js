"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const reviews_validation_1 = require("./reviews.validation");
const router = express_1.default.Router();
router.post("/addReview", (0, zodValidationRequest_1.default)(reviews_validation_1.ReviewsValidation.reviewsZodSchema), reviews_controller_1.ReviewsController.addReview);
router.get("/getReviews/:id", reviews_controller_1.ReviewsController.getReviewsByProductID);
router.patch("/updateReview/:id", reviews_controller_1.ReviewsController.updateReview);
exports.ReviewsRouter = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRouter = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const wishlist_validation_1 = require("./wishlist.validation");
const router = express_1.default.Router();
router.post("/addWishlist", (0, zodValidationRequest_1.default)(wishlist_validation_1.WishlistValidation.wishlistZodSchema), wishlist_controller_1.WishlistController.addWishlist);
router.get("/getWishlists/:id", wishlist_controller_1.WishlistController.getWishlistsByUserID);
router.delete("/deleteWishlist", (0, zodValidationRequest_1.default)(wishlist_validation_1.WishlistValidation.deleteWishlistZodSchema), wishlist_controller_1.WishlistController.deleteWishlist);
exports.WishlistRouter = router;

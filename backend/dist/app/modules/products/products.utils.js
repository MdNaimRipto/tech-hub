"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductRating = exports.generateProductCode = void 0;
const reviews_schema_1 = require("../reviews/reviews.schema");
function generateProductCode() {
    const codeLength = 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "P#";
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}
exports.generateProductCode = generateProductCode;
function getProductRating(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        const ratings = yield reviews_schema_1.Reviews.find({ productId: productID }, { _id: 0, rating: 1 });
        // Extract the ratings from the objects
        const ratingValues = ratings.map(ratingObj => ratingObj.rating);
        const totalRating = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const ratingCount = ratingValues.length;
        const avgRating = totalRating / ratingCount;
        const newRating = parseFloat(avgRating.toFixed(1));
        return newRating;
    });
}
exports.getProductRating = getProductRating;

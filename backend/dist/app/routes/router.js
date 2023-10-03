"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const products_router_1 = require("../modules/products/products.router");
const reviews_router_1 = require("../modules/reviews/reviews.router");
const questions_router_1 = require("../modules/questions/questions.router");
const wishlist_router_1 = require("../modules/wishlist/wishlist.router");
const order_router_1 = require("../modules/order/order.router");
const pcBuilder_router_1 = require("../modules/pcBuilder/pcBuilder.router");
const router = express_1.default.Router();
const routes = [
    {
        path: "/user",
        route: user_router_1.UsersRouter,
    },
    {
        path: "/products",
        route: products_router_1.ProductsRouter,
    },
    {
        path: "/reviews",
        route: reviews_router_1.ReviewsRouter,
    },
    {
        path: "/questions",
        route: questions_router_1.QuestionsRouter,
    },
    {
        path: "/wishlist",
        route: wishlist_router_1.WishlistRouter,
    },
    {
        path: "/order",
        route: order_router_1.OrderRouter,
    },
    {
        path: "/pcBuilder",
        route: pcBuilder_router_1.PcBuilderRouter,
    },
];
routes.map(r => router.use(r.path, r.route));
exports.Routers = router;

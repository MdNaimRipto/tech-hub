import express from "express";
import { UsersRouter } from "../modules/user/user.router";
import { ProductsRouter } from "../modules/products/products.router";
import { ReviewsRouter } from "../modules/reviews/reviews.router";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: UsersRouter,
  },
  {
    path: "/products",
    route: ProductsRouter,
  },
  {
    path: "/reviews",
    route: ReviewsRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;

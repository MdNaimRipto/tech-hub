import express from "express";
import { UsersRouter } from "../modules/user/user.router";

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: UsersRouter,
  },
];

routes.map(r => router.use(r.path, r.route));

export const Routers = router;

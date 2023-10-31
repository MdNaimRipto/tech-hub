import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./middleware/globalErrorHandler";
import pathNotFoundErrorHandler from "./errors/pathNotFoundErrorHandler";
import { Routers } from "./app/routes/router";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic get function
app.get("/", async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({
    message: "Tech-Mart Server running successfully",
    statusCode: httpStatus.OK,
  });
});

// ! Middleware to Update any value {Warning: Use only if needed}
// app.get("/api/update", async (req, res) => {
//   try {
//     const products = await Products.find().exec();

//     for (const product of products) {
//       product.brand = product.brand.toLowerCase();
//       await product.save(); // Update and save each document
//     }

//     res.json({ message: "Updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//* Main endpoint
app.use("/api/v1.0", Routers);

//* Global error Handler
app.use(globalErrorHandler);

//* Path Not Found Error Handler
app.use(pathNotFoundErrorHandler);

export default app;

import cors from "cors";
import express, { Application } from "express";
import userRouter from "./app/modules/users/users.route";
import {
  globalErrorHandler,
  notFoundErrorHandler,
} from "./middleware/error.middleware";

// initialize app
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Our University!" });
});

// routes
app.use("/api/v1/users", userRouter);

// error handling middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;

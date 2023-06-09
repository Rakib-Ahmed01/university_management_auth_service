import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler, { notFoundErrorHandler } from "./middlewares/error";
import { router } from "./routes";

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
app.use("/", router);

// error handling middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;

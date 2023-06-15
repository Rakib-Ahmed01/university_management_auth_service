import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler, { notFoundErrorHandler } from "./middlewares/error";
import { router } from "./routes";
import { generateAdminId } from "./utils/generateIds";

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

const academicSemester = {
  year: "2023",
  code: "02",
};

(async () => {
  const id = await generateAdminId();
  console.log(id);
})();

// error handling middleware
app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;

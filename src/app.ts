import cors from "cors";
import express, { Application } from "express";

// initialize app
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TESTING!!!
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

export default app;

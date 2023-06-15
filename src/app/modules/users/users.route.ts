import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { studentRouter } from "../student/student.route";
import { createUser, getAllUsers, getUserById } from "./users.controller";
import { createUserZodSchema } from "./users.validation";

const userRouter = express.Router();

userRouter.use("/students", studentRouter);

userRouter.route("/").get(getAllUsers);

userRouter.post(
  "/create-user",
  validateRequest(createUserZodSchema),
  createUser
);
userRouter.route("/:id").get(getUserById);

export default userRouter;

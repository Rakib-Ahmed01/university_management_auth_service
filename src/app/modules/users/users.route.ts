import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createUser, getAllUsers, getUserById } from "./users.controller";
import { createUserZodSchema } from "./users.validation";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validateRequest(createUserZodSchema), createUser);
userRouter.route("/:id").get(getUserById);

export default userRouter;

import express from "express";
import { createUser, getUserById, getUsers } from "./users.controller";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id").get(getUserById).post();

export default userRouter;

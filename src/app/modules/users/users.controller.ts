import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import {
  createUserService,
  getUserByIdService,
  getUsersService,
} from "./users.services";

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await createUserService(user);
    res.status(200).json({ date: createdUser, success: true });
  }
);

export const getUsers = async (req: Request, res: Response) => {
  const users = await getUsersService();
  res.status(200).json({ date: users, success: true });
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await getUserByIdService(userId);
  res.status(200).json({ date: user, success: true });
};

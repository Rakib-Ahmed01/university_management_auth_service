import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../../utils/sendResponse";
import { IUser } from "./users.interface";
import {
  createUserService,
  getUserByIdService,
  getUsersService,
} from "./users.services";

export const createUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body;
    const createdUser = await createUserService(user);

    sendResponse<IUser>(res, {
      data: createdUser,
      message: "User created successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
);

export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const users = await getUsersService();

    sendResponse<IUser>(res, {
      data: users,
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
);

export const getUserById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await getUserByIdService(userId);
    sendResponse<IUser>(res, {
      data: user,
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
);

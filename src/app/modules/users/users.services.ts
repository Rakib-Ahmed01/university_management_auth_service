import { defaultUserPassword } from "../../../config";
import { IUser } from "./users.interface";
import User from "./users.model";
import { generateUserId } from "./users.utils";

export const createUserService = async (user: IUser) => {
  // assign default password if password is not provided
  if (!user?.password && user.role === "student") {
    user.password = defaultUserPassword as string;
  }

  const id = await generateUserId();

  user.id = id;

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error("Failed to create user!");
  }

  return createdUser;
};

export const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

export const getUserByIdService = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

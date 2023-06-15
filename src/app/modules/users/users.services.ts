import { defaultUserPassword } from "../../../config";
import { generateStudentId } from "../../../utils/generateIds";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { IUser } from "./users.interface";
import User from "./users.model";

export const createUserService = async (user: IUser) => {
  // assign default password if password is not provided
  user.password = defaultUserPassword as string;

  const id = await generateStudentId(0 as unknown as IAcademicSemester);

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

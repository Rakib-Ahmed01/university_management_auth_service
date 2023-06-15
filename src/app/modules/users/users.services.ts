import { defaultUserPassword } from "../../../config";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "../../../utils/generateIds";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { IUser } from "./users.interface";
import User from "./users.model";

export const createUserService = async (user: IUser) => {
  // assign default password if password is not provided
  user.password = defaultUserPassword as string;

  let id = "0";

  if (user.role === "student") {
    id = await generateStudentId({
      year: "2023",
      code: "03",
    } as IAcademicSemester);
  } else if (user.role === "admin") {
    id = await generateAdminId();
  } else if (user.role === "faculty") {
    id = await generateFacultyId();
  }

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

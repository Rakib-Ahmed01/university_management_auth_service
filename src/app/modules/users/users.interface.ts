import { Model } from "mongoose";

export type UserRole = "super_admin" | "admin" | "student" | "faculty";

export type IUser = {
  id: string;
  role: UserRole;
  password: string;
};

export type UserModel = Model<IUser>;

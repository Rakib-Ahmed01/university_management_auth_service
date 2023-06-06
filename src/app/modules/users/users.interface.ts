import { Model } from "mongoose";

export type IUser = {
  id: string;
  role: "admin" | "student" | "faculty";
  password: string;
};

export type UserModel = Model<IUser>;

import { Model, Schema, model } from "mongoose";
import { IUser } from "./users.interface";

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "student", "faculty"],
      message:
        "Invalid role specified. Allowed roles are admin, student, and faculty.",
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must be at least 6 characters long."],
  },
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;

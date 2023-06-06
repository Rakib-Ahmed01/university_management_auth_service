import { Schema, model } from "mongoose";
import { defaultUserPassword } from "../../../config";
import { IUser, UserModel } from "./users.interface";

const userSchema = new Schema<IUser>(
  {
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
      default: defaultUserPassword,
      min: [6, "Password must be at least 6 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser, UserModel>("User", userSchema);

export default User;

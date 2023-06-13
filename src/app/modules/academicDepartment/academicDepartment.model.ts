import { Schema, model } from "mongoose";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.interface";
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from "./academicDepartment.interface";

const academicSchema = new Schema<IAcademicDepartment, AcademicFacultyModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>("academicDepartment", academicSchema);

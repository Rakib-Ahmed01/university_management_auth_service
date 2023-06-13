import { Schema, model } from "mongoose";
import { AcademicSemeterModel } from "../academicSemester/academicSemeter.interface";
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>({
  title: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^Faculty of [A-Za-z\s&]+$/.test(v);
      },
      message:
        "Invalid faculty name. Facult name must be started with Faculty of ...",
    },
  },
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicSemeterModel>(
  "AcademicFaculty",
  academicFacultySchema
);

import { Schema, model } from "mongoose";

import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => {
          return /^Faculty of [A-Za-z\s&]+$/.test(v);
        },
        message:
          "Invalid faculty name. Faculty name must be started with Faculty of ...",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema
);

import { Schema, model } from "mongoose";
import {
  academicSemesterCodes,
  academicSemesterMonths,
} from "./academicSemeter.constants";
import {
  AcademicSemeterModel,
  IAcademicSemeter,
} from "./academicSemeter.interface";

const academicSemester = new Schema<IAcademicSemeter>(
  {
    title: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterMonths,
        message: `title must be - ${academicSemesterMonths.join(", ")}`,
      },
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: {
        values: academicSemesterCodes,
        message: `code must be - ${academicSemesterCodes.join(", ")}`,
      },
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonths,
      message: `start month must be - ${academicSemesterMonths.join(", ")}`,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonths,
      message: `end month must be - ${academicSemesterMonths.join(", ")}`,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicSemester = model<IAcademicSemeter, AcademicSemeterModel>(
  "AcademicSemester",
  academicSemester
);

export default AcademicSemester;

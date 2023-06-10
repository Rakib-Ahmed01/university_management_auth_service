import { StatusCodes } from "http-status-codes";
import { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
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
        values: academicSemesterTitles,
        message: `title must be - ${academicSemesterTitles.join(", ")}`,
      },
    },
    year: {
      type: String,
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

academicSemester.pre("save", async function (next) {
  const doesExist = await AcademicSemester.findOne({
    year: this.year,
    title: this.title,
  });

  if (doesExist) {
    throw new ApiError(StatusCodes.CONFLICT, "Semester already exists");
  }

  next();
});

const AcademicSemester = model<IAcademicSemeter, AcademicSemeterModel>(
  "AcademicSemester",
  academicSemester
);

export default AcademicSemester;

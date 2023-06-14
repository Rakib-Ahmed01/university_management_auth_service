import { StatusCodes } from "http-status-codes";
import { FilterQuery, Schema, Types, UpdateQuery, model } from "mongoose";
import ApiError from "../../../errors/ApiError";
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from "./academicSemester.constants";
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from "./academicSemester.interface";

const academicSemester = new Schema<IAcademicSemester, AcademicSemesterModel>(
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
    next(new ApiError(StatusCodes.CONFLICT, "Semester already exists"));
  }

  next();
});

academicSemester.pre("findOneAndUpdate", async function (next) {
  const filters = this.getFilter() as FilterQuery<
    Partial<{ _id: Types.ObjectId }>
  >;

  const updateData = this.getUpdate() as UpdateQuery<
    Partial<IAcademicSemester>
  > &
    Partial<IAcademicSemester>;

  if (!updateData) {
    return next(new ApiError(StatusCodes.BAD_REQUEST, "Missing update data"));
  }

  const docToUpdate = await AcademicSemester.findOne({
    _id: filters?._id,
  });

  const doesExist = await AcademicSemester.findOne({
    _id: { $ne: docToUpdate?._id },
    year: updateData?.year || docToUpdate?.year,
    code: updateData?.code || docToUpdate?.code,
  });

  if (doesExist) {
    return next(new ApiError(StatusCodes.CONFLICT, "Semester already exists"));
  }

  next();
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemester
);

export default AcademicSemester;

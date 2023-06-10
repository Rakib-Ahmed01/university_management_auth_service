import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { semesterTitleCodeMapper } from "./academicSemeter.constants";
import { IAcademicSemeter } from "./academicSemeter.interface";
import AcademicSemester from "./academicSemeter.model";

export const createAcademicSemesterService = async (
  semester: IAcademicSemeter
): Promise<IAcademicSemeter> => {
  if (semesterTitleCodeMapper[semester.code] !== semester.title) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid semester code: ${semester.code} code should be ${
        semesterTitleCodeMapper[semester.code]
      }`
    );
  }

  const createdSemester = await AcademicSemester.create(semester);
  return createdSemester;
};

export const getAllSemestersService = async (
  paginationOptions: PaginationOptions
): Promise<PaginationResponse<IAcademicSemeter[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;
  const skip = (page - 1) * limit;

  const semesters = await AcademicSemester.find()
    .skip(skip)
    .limit(limit)
    .sort();

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: semesters,
  };
};

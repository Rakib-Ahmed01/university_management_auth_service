import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { semesterTitleCodeMapper } from "./academicSemeter.constants";
import { IAcademicSemeter } from "./academicSemeter.interface";
import AcademicSemester from "./academicSemeter.model";

export const createAcademicSemesterService = async (
  semester: IAcademicSemeter
) => {
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

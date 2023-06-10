import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { FilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { calculateSkip } from "./../../../utils/calculateSkip";
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
  paginationOptions: PaginationOptions,
  filters: FilterOptions
): Promise<PaginationResponse<IAcademicSemeter[]>> => {
  const { page, limit, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = paginationOptions;
  const { search, ...filterableFields } = filters;

  const searchCondition = generateSearchCondition("or", search, [
    "title",
    "code",
    "year",
  ]);

  const [semesters, total] = await Promise.all([
    AcademicSemester.find({ $and: [searchCondition, filterableFields] })
      .skip(skip)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      })
      .lean(),
    AcademicSemester.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: semesters,
  };
};

import ApiError from "../../../errors/ApiError";
import { AcademicFacultyFilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { validateTitleCode } from "../../../utils/validateTitleCode";
import { calculateSkip } from "./../../../utils/calculateSkip";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createAcademicSemesterService = async (
  semester: IAcademicSemester
): Promise<IAcademicSemester> => {
  const isValidTitleOrCode = await validateTitleCode(
    semester.code,
    semester.title
  );

  if (isValidTitleOrCode instanceof ApiError) {
    throw isValidTitleOrCode;
  }

  const createdSemester = await AcademicSemester.create(semester);
  return createdSemester;
};

export const getAllSemestersService = async (
  paginationOptions: PaginationOptions,
  filterOptions: AcademicFacultyFilterOptions
): Promise<PaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = paginationOptions;
  const { search, ...filters } = filterOptions;

  const searchCondition = generateSearchCondition("or", search, [
    "title",
    "code",
    "year",
  ]);

  const [semesters, total] = await Promise.all([
    AcademicSemester.find({ $and: [searchCondition, filters] })
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

export const getSemesterByIdService = async (
  semesterId: string
): Promise<IAcademicSemester | null> => {
  const semester = await AcademicSemester.findOne({ _id: semesterId });
  return semester;
};

export const updateSemesterService = async (
  semesterId: string,
  payload: Partial<IAcademicSemester>
) => {
  const isValidTitleOrCode = await validateTitleCode(
    payload.code,
    payload.title,
    semesterId
  );

  if (isValidTitleOrCode instanceof ApiError) {
    throw isValidTitleOrCode;
  }

  const updatedSemester = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true }
  );
  return updatedSemester;
};

export const deleteSemesterService = async (semesterId: string) => {
  const result = await AcademicSemester.deleteOne({ _id: semesterId });
  return result;
};

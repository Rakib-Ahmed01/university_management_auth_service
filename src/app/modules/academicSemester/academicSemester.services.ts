import ApiError from "../../../errors/ApiError";
import { FilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { validateTitleCode } from "../../../utils/validateTitleCode";
import { calculateSkip } from "./../../../utils/calculateSkip";
import { IAcademicSemeter } from "./academicSemeter.interface";
import AcademicSemester from "./academicSemeter.model";

export const createAcademicSemesterService = async (
  semester: IAcademicSemeter
): Promise<IAcademicSemeter> => {
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

export const getSemesterByIdService = async (
  semesterId: string
): Promise<IAcademicSemeter | null> => {
  const semester = await AcademicSemester.findOne({ _id: semesterId });
  return semester;
};

export const updateSemesterService = async (
  semesterId: string,
  payload: Partial<IAcademicSemeter>
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
  const semester = await AcademicSemester.deleteOne({ _id: semesterId });
  return semester;
};

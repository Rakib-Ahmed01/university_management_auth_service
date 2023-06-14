import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { AcademicFacultyFilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { calculateSkip } from "../../../utils/calculateSkip";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { handleSortByAndSortOrder } from "../../../utils/handleSortByAndSortOrder";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createAcademicFacultyService = async (
  payload: IAcademicFaculty
) => {
  const createdAcademicFaculty = await AcademicFaculty.create(payload);
  return createdAcademicFaculty;
};

export const getAllAcademicFacultyService = async (
  paginationOptions: PaginationOptions,
  filterOptions: AcademicFacultyFilterOptions
): Promise<PaginationResponse<IAcademicFaculty[]>> => {
  const { limit, page, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOptions);
  const { search, ...filters } = filterOptions || {};

  const searchCondition = generateSearchCondition("or", search, ["title"]);

  const [academicFaculties, total] = await Promise.all([
    await AcademicFaculty.find({
      $and: [searchCondition, filters],
    })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
    AcademicFaculty.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: academicFaculties,
  };
};

export const getFacultyByIdService = async (
  facultyId: string
): Promise<IAcademicFaculty | null> => {
  const faculty = await AcademicFaculty.findOne({ _id: facultyId });
  return faculty;
};

export const updateAcademicFacultyService = async (
  facultyId: string,
  payload: IAcademicFaculty
) => {
  if (Object.keys(payload).length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Missing update data");
  }

  const updatedFaculty = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    { new: true }
  );

  return updatedFaculty;
};

export const deleteAcademicFacultyService = async (facultyId: string) => {
  const result = await AcademicFaculty.deleteOne({ _id: facultyId });

  return result;
};

import { AcademicDepartmentFilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { PaginationResponse } from "../../../types/PaginationResponse";
import { calculateSkip } from "../../../utils/calculateSkip";
import { generateSearchCondition } from "../../../utils/generateSearchCondition";
import { handleSortByAndSortOrder } from "../../../utils/handleSortByAndSortOrder";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

export const createAcademicDepartmentService = async (
  payload: IAcademicDepartment
) => {
  const createdAcademicDepartment = await AcademicDepartment.create(payload);
  return createdAcademicDepartment;
};

export const getAllAcademicDepartmentService = async (
  paginationOptions: PaginationOptions,
  filterOptions: AcademicDepartmentFilterOptions
): Promise<PaginationResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip } = calculateSkip(paginationOptions);
  const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOptions);
  const { search, ...filters } = filterOptions;
  const searchCondition = generateSearchCondition("or", search, ["title"]);

  const [departments, total] = await Promise.all([
    AcademicDepartment.find({ $and: [searchCondition, filters] })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
    AcademicDepartment.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: departments,
  };
};

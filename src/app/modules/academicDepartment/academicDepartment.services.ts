import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { AcademicDepartmentFilterOptions } from '../../../types/FilterOptions';
import { PaginationOptions } from '../../../types/PaginationOptions';
import { PaginationResponse } from '../../../types/PaginationResponse';
import { calculateSkip } from '../../../utils/calculateSkip';
import { generateSearchCondition } from '../../../utils/generateSearchCondition';
import { handleSortByAndSortOrder } from '../../../utils/handleSortByAndSortOrder';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

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
  const searchCondition = generateSearchCondition('or', search, ['title']);

  const [departments, total] = await Promise.all([
    AcademicDepartment.find({ $and: [searchCondition, filters] })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('academicFaculty'),
    AcademicDepartment.countDocuments(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: departments,
  };
};

export const getDepartmentByIdService = async (
  departmentId: string
): Promise<IAcademicDepartment | null> => {
  const department = await AcademicDepartment.findOne({
    _id: departmentId,
  }).populate('academicFaculty');
  return department;
};

export const updateDepartmentService = async (
  departmentId: string,
  payload: Partial<IAcademicDepartment>
) => {
  if (Object.keys(payload).length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing update data');
  } else if (
    !Object.keys(payload).includes('title') &&
    !Object.keys(payload).includes('academicFaculty')
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Missing update data. Title or Academic Faculty Id is required'
    );
  }

  const updatedDepartment = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true }
  );

  return updatedDepartment;
};

export const deleteDepartmentService = async (departmentId: string) => {
  const result = await AcademicDepartment.deleteOne({ _id: departmentId });
  return result;
};

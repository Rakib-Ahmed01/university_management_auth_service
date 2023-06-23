import { QueryObject } from '../../../types/QueryObject';
import { deleteDataById } from '../../../utils/deleteDataById';
import { paginate } from '../../../utils/paginate';
import { updateData } from '../../../utils/updateData';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

export const createAcademicFacultyService = async (
  payload: IAcademicFaculty
) => {
  const createdAcademicFaculty = await AcademicFaculty.create(payload);
  return createdAcademicFaculty;
};

// export const getAllAcademicFacultyService = async (
//   paginationOptions: PaginationOptions,
//   filterOptions: AcademicFacultyFilterOptions
// ): Promise<PaginationResponse<IAcademicFaculty[]>> => {
//   const { limit, page, skip } = calculateSkip(paginationOptions);
//   const { sortBy, sortOrder } = handleSortByAndSortOrder(paginationOptions);
//   const { search, ...filters } = filterOptions || {};

//   const searchCondition = generateSearchCondition("or", search, ["title"]);

//   const [academicFaculties, total] = await Promise.all([
//     await AcademicFaculty.find({
//       $and: [searchCondition, filters],
//     })
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder }),
//     AcademicFaculty.countDocuments(),
//   ]);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: academicFaculties,
//   };
// };

export const getAllAcademicFacultyService = async (
  queryObject: QueryObject
) => {
  const result = await paginate<
    AcademicFacultyModel,
    IAcademicFaculty,
    { title: string; search: string }
  >({
    queryObject,
    filterOptions: ['title', 'search'],
    model: AcademicFaculty,
  });
  return result;
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
  const updatedFaculty = await updateData(
    facultyId,
    AcademicFaculty,
    'Faculty',
    payload
  );

  return updatedFaculty;
};

export const deleteAcademicFacultyService = async (facultyId: string) => {
  const result = await deleteDataById(
    facultyId,
    AcademicFaculty,
    'Academic Faculty'
  );

  return result;
};

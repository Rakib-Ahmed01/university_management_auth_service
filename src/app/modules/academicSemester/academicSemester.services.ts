import ApiError from '../../../errors/ApiError';
import { AcademicSemesterFilterOptions } from '../../../types/FilterOptions';
import { QueryObject } from '../../../types/QueryObject';
import { paginate } from '../../../utils/paginate';
import { validateTitleCode } from '../../../utils/validateTitleCode';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

export const createAcademicSemesterService = async (
  semester: IAcademicSemester
) => {
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

export const getAllSemestersService = async (queryObject: QueryObject) => {
  const result = await paginate<
    AcademicSemesterModel,
    IAcademicSemester,
    AcademicSemesterFilterOptions
  >({
    queryObject,
    filterFields: ['code', 'search', 'title', 'year'],
    model: AcademicSemester,
    searchFields: ['title', 'code', 'year'],
    filterOptions: ['code', 'search', 'title', 'year'],
  });
  return result;
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

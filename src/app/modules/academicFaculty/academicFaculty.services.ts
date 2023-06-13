import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

export const createAcademicFacultyService = async (
  payload: IAcademicFaculty
) => {
  const createdAcademicFaculty = await AcademicFaculty.create(payload);
  return createdAcademicFaculty;
};

export const getAllAcademicFacultyService = async (
  payload: IAcademicFaculty
) => {
  const createdAcademicFaculty = await AcademicFaculty.create(payload);
  return createdAcademicFaculty;
};

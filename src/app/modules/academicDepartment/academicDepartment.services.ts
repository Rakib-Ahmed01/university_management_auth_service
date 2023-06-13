import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

export const createAcademicDepartmentService = async (
  payload: IAcademicDepartment
) => {
  const createdAcademicDepartment = await AcademicDepartment.create(payload);
  return createdAcademicDepartment;
};

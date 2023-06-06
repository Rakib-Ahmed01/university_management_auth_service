import { IAcademicSemeter } from "./academicSemeter.interface";
import AcademicSemester from "./academicSemeter.model";

export const createAcademicSemesterService = async (
  semester: IAcademicSemeter
) => {
  const createdSemester = await AcademicSemester.create(semester);
  return createdSemester;
};

import { StatusCodes } from "http-status-codes";
import { semesterTitleCodeMapper } from "../app/modules/academicSemester/academicSemeter.constants";
import AcademicSemester from "../app/modules/academicSemester/academicSemeter.model";
import ApiError from "../errors/ApiError";

const returnError = (code: string) => {
  return new ApiError(
    StatusCodes.BAD_REQUEST,
    `Invalid semester code: ${code} code should be ${semesterTitleCodeMapper[code]}`
  );
};

export const validateTitleCode = async (
  code: string | undefined,
  title: string | undefined,
  semesterId?: string
) => {
  const docToUpdate = await AcademicSemester.findOne({ _id: semesterId });

  if (code && !title) {
    if (semesterTitleCodeMapper[code] !== docToUpdate?.title) {
      return returnError(code);
    }
  } else if (title && !code) {
    if (semesterTitleCodeMapper[docToUpdate?.code as string] !== title) {
      return returnError(docToUpdate?.code as string);
    }
  } else if (title && code) {
    if (semesterTitleCodeMapper[code] !== title) {
      return returnError(code);
    }
  }
  return true;
};

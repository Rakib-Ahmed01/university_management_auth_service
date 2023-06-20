import { StatusCodes } from 'http-status-codes';
import { startSession } from 'mongoose';
import { defaultUserPassword } from '../../../config';
import { IObjectId } from '../../../types/ObjectId';
import { generateStudentId } from '../../../utils/generateIds';
import { throwApiError } from '../../../utils/throwApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IUser } from '../users/users.interface';
import User from '../users/users.model';
import { IStudent } from './student.interface';
import { Student } from './student.model';

export const createStudentService = async (
  password: string,
  student: IStudent
) => {
  const academicSemester = await AcademicSemester.findOne({
    _id: student.academicSemester,
  });

  if (!academicSemester) {
    throwApiError(StatusCodes.BAD_REQUEST, 'Academic Semester not found');
  }

  const session = await startSession();
  let newStudent = {} as IStudent | null;

  try {
    session.startTransaction();

    const user = {} as IUser;

    const studentId = await generateStudentId(
      academicSemester as IAcademicSemester
    );

    user.id = studentId;
    user.password = password ? password : (defaultUserPassword as string);
    user.role = 'student';

    student.id = studentId;
    const createdStudent = await Student.create([student], { session });

    if (!createdStudent.length) {
      throwApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create the student'
      );
    }

    user.student = createdStudent[0]._id as unknown as IObjectId;

    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throwApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create the student. Try Again'
      );
    }

    newStudent = await Student.findOne({ _id: createdStudent[0]._id })
      .populate('academicSemester')
      .populate('academicFaculty')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
      .session(session);

    console.log({ createdStudent, newStudent, _id: createdStudent[0]._id });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newStudent;
};

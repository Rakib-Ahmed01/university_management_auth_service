import { StatusCodes } from 'http-status-codes';
import { isValidObjectId, startSession } from 'mongoose';
import { defaultUserPassword } from '../../../config';
import { IObjectId } from '../../../types/ObjectId';
import { QueryObject } from '../../../types/QueryObject';
import { generateStudentId } from '../../../utils/generateIds';
import { paginate } from '../../../utils/paginate';
import { throwApiError } from '../../../utils/throwApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IUser } from '../users/users.interface';
import User from '../users/users.model';
import { IStudent, StudentModel } from './student.interface';
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

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  return newStudent;
};

export const getAllStudentsService = async (queryObject: QueryObject) => {
  const result = await paginate<
    StudentModel,
    IStudent,
    { name: string; id: string }
  >({
    filterOptions: ['id', 'name'],
    model: Student,
    queryObject,
  });

  return result;
};

export const getStudentByIdService = async (studentId: string) => {
  if (!isValidObjectId(studentId)) {
    throwApiError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  const student = await Student.findOne({ _id: studentId })
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return student;
};

export const updateStudentService = async (
  studentId: string,
  payload: Partial<IStudent>
) => {
  const isExist = await Student.findOne({ _id: studentId });

  if (!isExist) {
    throwApiError(StatusCodes.NOT_FOUND, 'Student not found');
  }

  const updateData = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      for (const [key2, value2] of Object.entries(value)) {
        updateData[`${key}.${key2}`] = value2;
      }
    } else {
      updateData[key] = value;
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return updatedStudent;
};

export const deleteStudentService = async (studentId: string) => {
  const session = await startSession();

  let result = {};

  try {
    session.startTransaction();

    [result] = await Promise.all([
      Student.deleteOne({ _id: studentId }).session(session),
      User.deleteOne({ student: studentId }).session(session),
    ]);

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  return result;
};

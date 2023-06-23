import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../../utils/sendResponse';
import { IStudent } from './student.interface';
import {
  createStudentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
} from './student.services';

export const createStudent = expressAsyncHandler(async (req, res) => {
  const { password = '', student } = req.body;
  const createdStudent = await createStudentService(password, student);

  sendResponse<IStudent>(res, {
    data: createdStudent,
    message: 'Student created successfully',
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const getAllStudents = expressAsyncHandler(async (req, res) => {
  const result = await getAllStudentsService(req.query);

  sendResponse<IStudent>(res, {
    data: result.data,
    message: 'Students retrieved successfully',
    statusCode: StatusCodes.OK,
    success: true,
    meta: result.meta,
  });
});

export const getStudentById = expressAsyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await getStudentByIdService(studentId);

  sendResponse<IStudent>(res, {
    data: student,
    message: 'Student retrieved successfully',
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const updateStudent = expressAsyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const { student: updateData } = req.body;

  const student = await updateStudentService(studentId, updateData);

  sendResponse<IStudent>(res, {
    data: student,
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student updated successfully',
  });
});

export const deleteStudent = expressAsyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const result = await deleteStudentService(studentId);

  sendResponse(res, {
    data: result,
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student deleted successfully',
  });
});

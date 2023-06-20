import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../../utils/sendResponse';
import { IStudent } from './student.interface';
import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
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
  const students = await getAllStudentsService();

  sendResponse<IStudent>(res, {
    data: students,
    message: 'Students retrieved successfully',
    statusCode: StatusCodes.OK,
    success: true,
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

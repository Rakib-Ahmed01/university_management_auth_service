import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../../utils/sendResponse';
import { IStudent } from './student.interface';
import { createStudentService } from './student.services';

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

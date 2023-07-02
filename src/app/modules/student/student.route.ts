import express from 'express';
import { validateRequest } from '../../../middlewares/validateRequest';
import { hashPassword } from '../../../utils/hashPassword';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from './student.controller';
import {
  createStudentZodSchema,
  updateStudentZodSchema,
} from './student.validation';

export const studentRouter = express.Router();

studentRouter
  .route('/:studentId')
  .get(getStudentById)
  .patch(validateRequest(updateStudentZodSchema), updateStudent)
  .delete(deleteStudent);

studentRouter
  .route('/')
  .get(getAllStudents)
  .post(validateRequest(createStudentZodSchema), hashPassword(), createStudent);

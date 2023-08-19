import express, { Router } from 'express';
import { academicDepartmentRouter } from '../app/modules/academicDepartment/academicDepartment.route';
import { academicFacultyRouter } from '../app/modules/academicFaculty/academicFaculty.route';
import academicSemesterRouter from '../app/modules/academicSemester/academicSemester.route';
import { authRouter } from '../app/modules/auth/auth.route';
import { studentRouter } from '../app/modules/student/student.route';
import userRouter from '../app/modules/users/users.route';

export const router = express.Router();

type Route = {
  path: string;
  router: Router;
};

const routes: Route[] = [
  {
    path: '/api/v1/students',
    router: studentRouter,
  },
  {
    path: '/api/v1/semesters',
    router: academicSemesterRouter,
  },
  {
    path: '/api/v1/academic-faculties',
    router: academicFacultyRouter,
  },
  {
    path: '/api/v1/academic-departments',
    router: academicDepartmentRouter,
  },
  {
    path: '/api/v1/users',
    router: userRouter,
  },
  {
    path: '/api/v1/auth',
    router: authRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.router));

import express, { Router } from 'express';
import { academicDepartmentRouter } from '../app/modules/academicDepartment/academicDepartment.route';
import { academicFacultyRouter } from '../app/modules/academicFaculty/academicFaculty.route';
import academicSemesterRouter from '../app/modules/academicSemester/academicSemester.route';
import { studentRouter } from '../app/modules/student/student.route';

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
];

routes.forEach((route) => router.use(route.path, route.router));

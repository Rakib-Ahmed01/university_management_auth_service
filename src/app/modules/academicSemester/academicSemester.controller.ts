import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { filterFields } from '../../../constants/filters';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import { AcademicSemesterFilterOptions } from '../../../types/FilterOptions';
import { PaginationOptions } from '../../../types/PaginationOptions';
import { QueryObject } from '../../../types/QueryObject';
import { pickOptions } from '../../../utils/pickOptions';
import { sendResponse } from '../../../utils/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import {
  createAcademicSemesterService,
  deleteSemesterService,
  getAllSemestersService,
  getSemesterByIdService,
  updateSemesterService,
} from './academicSemester.services';

export const createSemester = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semester = req.body;
    const createdSemester = await createAcademicSemesterService(semester);

    console.log({
      data: createdSemester,
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Semester created successfully',
    });

    sendResponse<IAcademicSemester>(res, {
      data: createdSemester,
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Semester created successfully',
    });
  }
);

export const getAllSemesters = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as QueryObject,
      paginationFields
    ) as PaginationOptions;

    const filters = pickOptions(
      req.query as QueryObject,
      filterFields
    ) as AcademicSemesterFilterOptions;

    const result = await getAllSemestersService(paginationOptions, filters);

    sendResponse<IAcademicSemester>(res, {
      data: result.data,
      success: true,
      statusCode: StatusCodes.OK,
      meta: result.meta,
    });
  }
);

export const getSemesterById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;

    const semester = await getSemesterByIdService(semesterId);

    if (!semester) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Semester not found');
    }

    sendResponse<IAcademicSemester>(res, {
      data: semester,
      success: true,
      statusCode: StatusCodes.OK,
    });
  }
);

export const updateSemester = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;
    const updateData = req.body;

    const semester = await updateSemesterService(semesterId, updateData);

    sendResponse<IAcademicSemester>(res, {
      data: semester,
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Semester updated successfully',
    });
  }
);

export const deleteSemester = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semesterId = req.params.semesterId;

    const result = await deleteSemesterService(semesterId);

    sendResponse(res, {
      data: result,
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Semester deleted successfully',
    });
  }
);

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { filterFields } from "../../../constants/filters";
import { paginationFields } from "../../../constants/pagination";
import { FilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { pickOptions } from "../../../utils/pickOptions";
import { sendResponse } from "../../../utils/sendResponse";
import {
  createAcademicSemesterService,
  getAllSemestersService,
  getSemesterByIdService,
  updateSemesterService,
} from "./academicSemester.services";
import { IAcademicSemeter } from "./academicSemeter.interface";

export const createSemester = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const semester = req.body;
    const createdSemester = await createAcademicSemesterService(semester);
    sendResponse<IAcademicSemeter>(res, {
      data: createdSemester,
      success: true,
      statusCode: StatusCodes.OK,
    });
  }
);

export const getAllSemesters = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as Record<string, unknown>,
      paginationFields
    ) as PaginationOptions;

    const filters = pickOptions(
      req.query as Record<string, unknown>,
      filterFields
    ) as FilterOptions;

    const result = await getAllSemestersService(paginationOptions, filters);

    sendResponse<IAcademicSemeter>(res, {
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

    sendResponse<IAcademicSemeter>(res, {
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

    sendResponse<IAcademicSemeter>(res, {
      data: semester,
      success: true,
      statusCode: StatusCodes.OK,
      message: "Semester updated successfully",
    });
  }
);

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { paginationFields } from "../../../constants/pagination";
import { FilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { pickOptions } from "../../../utils/pickOptions";
import { sendResponse } from "../../../utils/sendResponse";
import {
  createAcademicSemesterService,
  getAllSemestersService,
} from "./academicSemester.services";
import { IAcademicSemeter } from "./academicSemeter.interface";

export const createAcademicSemester = expressAsyncHandler(
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

    const filters = pickOptions(req.query as Record<string, unknown>, [
      "search",
      "year",
      "code",
      "title",
    ]) as FilterOptions;

    const result = await getAllSemestersService(paginationOptions, filters);

    sendResponse<IAcademicSemeter>(res, {
      data: result.data,
      success: true,
      statusCode: StatusCodes.OK,
      meta: result.meta,
    });
  }
);

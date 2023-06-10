import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { paginationFields } from "../../../constants/pagination";
import { pickPaginationOptions } from "../../../utils/pickPaginationOptions";
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
    const paginationOptions = pickPaginationOptions(
      req.query,
      paginationFields
    );

    const result = await getAllSemestersService(paginationOptions);

    sendResponse<IAcademicSemeter>(res, {
      data: result.data,
      success: true,
      statusCode: StatusCodes.OK,
      meta: result.meta,
    });
  }
);

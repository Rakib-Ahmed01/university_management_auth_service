import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { paginationFields } from "../../../constants/pagination";
import { AcademicDepartmentFilterOptions } from "../../../types/FilterOptions";
import { PaginationOptions } from "../../../types/PaginationOptions";
import { QueryObject } from "../../../types/QueryObject";
import { pickOptions } from "../../../utils/pickOptions";
import { sendResponse } from "../../../utils/sendResponse";
import { IAcademicDepartment } from "./academicDepartment.interface";
import {
  createAcademicDepartmentService,
  getAllAcademicDepartmentService,
} from "./academicDepartment.services";

export const createAcademicDepartment = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const academicDepartment = await createAcademicDepartmentService(payload);

    sendResponse<IAcademicDepartment>(res, {
      data: academicDepartment,
      statusCode: StatusCodes.OK,
      success: true,
      message: "Academic Department Created Successfully",
    });
  }
);

export const getAllAcademicDepartment = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const paginationOptions = pickOptions(
      req.query as QueryObject,
      paginationFields
    ) as PaginationOptions;

    const filters = pickOptions(req.query as QueryObject, [
      "title",
      "search",
    ]) as AcademicDepartmentFilterOptions;

    const result = await getAllAcademicDepartmentService(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicDepartment[]>(res, {
      data: result.data,
      success: true,
      statusCode: StatusCodes.OK,
      meta: result.meta,
    });
  }
);

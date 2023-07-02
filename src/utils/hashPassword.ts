import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { defaultUserPassword, saltRounds } from '../config';

export const hashPassword =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body;
    const password = (
      requestBody.password ? requestBody.password : defaultUserPassword
    ) as string;
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    requestBody.password = hashedPassword;
    next();
  };

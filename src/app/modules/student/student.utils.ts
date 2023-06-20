import { isValidObjectId } from 'mongoose';

export const validateObjectId = (val: string) => isValidObjectId(val);

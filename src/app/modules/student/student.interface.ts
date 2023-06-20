import { Model } from 'mongoose';
import { IObjectId } from '../../../types/ObjectId';
import { Guardian, LocalGuardian } from '../../../types/user';
import { UserBaseSchema } from '../users/users.interface';

export interface IStudent extends UserBaseSchema {
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicSemester: IObjectId;
  academicDepartment: IObjectId;
  academicFaculty: IObjectId;
}

export type StudentModel = Model<IStudent>;

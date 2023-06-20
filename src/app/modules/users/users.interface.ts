import { Model } from 'mongoose';
import { IObjectId } from '../../../types/ObjectId';
import { BloodGroup, Gender, Name } from '../../../types/user';

export type UserRole = 'super_admin' | 'admin' | 'student' | 'faculty';

export type IUser = {
  id: string;
  role: UserRole;
  password: string;
  student?: IObjectId;
  admin?: IObjectId;
  faculty?: IObjectId;
};

export interface UserBaseSchema {
  id: string;
  name: Name;
  gender: Gender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: BloodGroup;
}

export type UserModel = Model<IUser>;

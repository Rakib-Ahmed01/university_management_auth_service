import { Schema, model } from 'mongoose';
import { userBaseSchema } from '../users/users.schema';
import { IStudent, StudentModel } from './student.interface';

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    guardian: {
      fatherName: { type: String, required: [true, '`{PATH}` is required'] },
      fatherOccupation: {
        type: String,
        required: [true, '`{PATH}` is required'],
      },
      fatherContactNo: {
        type: String,
        required: [true, '`{PATH}` is required'],
      },
      motherName: { type: String, required: [true, '`{PATH}` is required'] },
      motherOccupation: {
        type: String,
        required: [true, '`{PATH}` is required'],
      },
      motherContactNo: {
        type: String,
        required: [true, '`{PATH}` is required'],
      },
      address: { type: String, required: [true, '`{PATH}` is required'] },
    },
    localGuardian: {
      name: { type: String, required: [true, '`{PATH}` is required'] },
      occupation: { type: String, required: [true, '`{PATH}` is required'] },
      contactNo: { type: String, required: [true, '`{PATH}` is required'] },
      address: { type: String, required: [true, '`{PATH}` is required'] },
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, '`{PATH}` is required'],
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, '`{PATH}` is required'],
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, '`{PATH}` is required'],
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>(
  'Student',
  studentSchema.add(userBaseSchema)
);

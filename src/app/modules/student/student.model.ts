import { Schema, model } from "mongoose";
import { IStudent, StudentModel } from "./student.interface";

export const userBaseProperties = {
  id: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
    message: {
      enum: 'Invalid gender specified. Only "male", "female", or "other" are allowed.',
    },
  },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
};

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    ...userBaseProperties,
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
      messages: {
        enum: "Invalid blood group specified. Allowed values are A+, A-, B+, B-, AB+, AB-, O+, O-.",
      },
    },
    guardian: {
      fatherName: { type: String, required: true },
      fatherOccupation: { type: String, required: true },
      fatherContactNo: { type: String, required: true },
      motherName: { type: String, required: true },
      motherOccupation: { type: String, required: true },
      motherContactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    localGuardian: {
      name: { type: String, required: true },
      occupation: { type: String, required: true },
      contactNo: { type: String, required: true },
      address: { type: String, required: true },
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudent, StudentModel>("Student", studentSchema);

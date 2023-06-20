import { Schema } from 'mongoose';
import { bloodGroups, genders } from './users.constants';

export const userBaseSchema = new Schema({
  id: { type: String, required: [true, '`{PATH}` is required'], unique: true },
  name: {
    firstName: { type: String, required: [true, '`{PATH}` is required'] },
    middleName: { type: String },
    lastName: { type: String, required: [true, '`{PATH}` is required'] },
  },
  gender: {
    type: String,
    enum: genders,
    required: [true, '`{PATH}` is required'],
    message: {
      enum: `Invalid gender specified. Only ${genders.join(
        ' , '
      )} are allowed.`,
    },
  },
  dateOfBirth: { type: String, required: [true, '`{PATH}` is required'] },
  email: {
    type: String,
    required: [true, '`{PATH}` is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, '`{PATH}` is required'],
    unique: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, '`{PATH}` is required'],
  },
  presentAddress: { type: String, required: [true, '`{PATH}` is required'] },
  permanentAddress: { type: String, required: [true, '`{PATH}` is required'] },
  bloodGroup: {
    type: String,
    enum: bloodGroups,
    required: [true, '`{PATH}` is required'],
    messages: {
      enum: `Invalid blood group specified. Only ${bloodGroups.join(
        ','
      )} are allowed.`,
    },
  },
});

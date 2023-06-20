import { Schema, model } from 'mongoose';
import { userRoles } from './users.constants';
import { IUser, UserModel } from './users.interface';

const userSchema = new Schema(
  {
    id: { type: String, required: [true, '`{PATH}` is required'] },
    role: {
      type: String,
      enum: {
        values: userRoles,
        message: `Invalid gender specified. Only ${userRoles.join(
          ' , '
        )} are allowed.`,
      },
      required: [true, '`{PATH}` is required'],
    },
    password: { type: String, required: [true, '`{PATH}` is required'] },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;

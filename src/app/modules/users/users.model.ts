import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { defaultUserPassword, saltRounds } from '../../../config';
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
    password: {
      type: String,
      required: [true, '`{PATH}` is required'],
      minLength: [6, 'Password must be at least 6 characters long'],
    },
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

userSchema.pre('save', async function (next) {
  const password = (
    this.password ? this.password : defaultUserPassword
  ) as string;

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(saltRounds)
  );
  this.password = hashedPassword;
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;

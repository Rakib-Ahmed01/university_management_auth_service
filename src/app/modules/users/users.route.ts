import express from 'express';
import { getAllUsers, getUserById } from './users.controller';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);

userRouter.route('/:id').get(getUserById);

export default userRouter;

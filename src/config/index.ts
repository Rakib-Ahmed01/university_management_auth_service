import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const mongoURI = process.env.MONGO_URI;
export const defaultUserPassword = process.env.DEFAULT_USER_PASSWORD;
export const saltRounds = process.env.SALT_ROUNDS;

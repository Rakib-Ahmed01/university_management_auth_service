import mongoose from "mongoose";
import app from "./app";
import { mongoURI, port } from "./config";
import { errorLogger, successLogger } from "./shared/logger";

export async function connectDb() {
  try {
    const connection = await mongoose.connect(mongoURI as string);
    successLogger.info(`Connected to database: ${connection.connection.host}`);

    app.listen(port, () => {
      successLogger.info(`Auth service listening on port ${port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect to database:`, error);
  }
}

connectDb();

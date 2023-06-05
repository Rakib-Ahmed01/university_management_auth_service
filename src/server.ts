import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { mongoURI, port } from "./config";
import { errorLogger, successLogger } from "./utils/logger";

let server: Server;

process.on("uncaughtException", (error) => {
  errorLogger.error(error);
  process.exit(1);
});

export async function connectDb() {
  try {
    const connection = await mongoose.connect(mongoURI as string);
    successLogger.info(`Connected to database: ${connection.connection.host}`);

    server = app.listen(port, () => {
      successLogger.info(`Auth service listening on port ${port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect to database:`, error);
  }

  process.on("unhandledRejection", (error) => {
    errorLogger.error(error);
    if (server) {
      server.close();
      process.exit(1);
    } else {
      process.exit(1);
    }
  });
}

connectDb();

process.on("SIGTERM", () => {
  successLogger.info("SIGTERM received...");
  if (server) {
    server.close();
    process.exit(1);
  } else {
    process.exit(1);
  }
});

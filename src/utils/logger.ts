import path from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

export const successLogger = createLogger({
  format: combine(label({ label: "auth-service" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: "info",
      filename: path.join(
        process.cwd(),
        "logs",
        "success",
        "auth-%DATE%-success.log"
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export const errorLogger = createLogger({
  format: combine(label({ label: "auth-service" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      level: "error",
      filename: path.join(
        process.cwd(),
        "logs",
        "error",
        "auth-%DATE%-error.log"
      ),
      datePattern: "YYYY-DD-MM-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

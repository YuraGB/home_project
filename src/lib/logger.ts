import winston, { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const logger = (fileName = "application") => {
  const fileLogTransport = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxFiles: "30d",
    maxSize: "20m",
  });

  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  });

  const newLogger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`,
      ),
    ),
    defaultMeta: "home_project",
    transports: [consoleTransport],
  });

  if (process.env.NODE_ENV === "development") {
    newLogger.add(fileLogTransport);
  }
  return newLogger;
};

export default logger();

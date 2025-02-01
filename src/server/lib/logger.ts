import { createLogger, format, transports } from "winston";

const logger = () => {
  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL || "info",
    handleExceptions: true,
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`,
      ),
    ),
  });

  const newLogger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`,
      ),
    ),
    defaultMeta: { service: "home_project" },
    transports: [consoleTransport],
  });

  return newLogger;
};

export default logger();

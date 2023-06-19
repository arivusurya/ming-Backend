const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

const Emaillogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "email.log",
      level: "info",
    }),
  ],
});

module.exports = { logger, Emaillogger };

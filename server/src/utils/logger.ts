import winston from 'winston';

const logLevels = {
  levels: {
    info: 0,
    error: 1,
  },
  colors: {
    info: 'green',
    error: 'red',
  },
};

// Create the logger
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    // Console transport for logging to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
      level: 'info', // Default log level (can be changed)
    }),
    // File transport for logging to a file
    new winston.transports.File({
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json() // Can also use winston.format.simple() for a simpler output
      ),
      level: 'info', // Only logs info and higher
    }),
  ],
  exitOnError: false, // Don't exit the process on logging errors
});

// Add custom colors for better log readability
winston.addColors(logLevels.colors);

export default logger;

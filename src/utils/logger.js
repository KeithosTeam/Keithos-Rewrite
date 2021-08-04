// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// module.exports = logger;

const { createLogger, format, transports } = require('winston');
const path = require('path');

// Custom log formatting
const logFormat = format.printf((info) => {
  const { timestamp, level, label, message, ...rest } = info;
  let log = `${timestamp} - ${level} [${label}]: ${message}`;

  // Check if rest is an object
  if (!( Object.keys(rest).length === 0 && rest.constructor === Object )) {
    log = `${log}\n${JSON.stringify(rest, null, 2)}`.replace(/\\n/g, '\n');
  }
  return log;
});

/**
 * Create a new logger
 * @type {Logger}
 */
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [ 
    // Logging to console
    new transports.Console({ 
      format: format.combine(
        format.colorize(),
        logFormat
      )
    }),
    // Logging info and up to file
    new transports.File({ 
      filename: '../../logs/full.log', 
      level: 'info',
      format: logFormat,
      options: { flags: 'w' } 
    }),
    // Logging only warns and errors to file
    new transports.File({ 
      filename: '../../logs/error.log',
      level: 'warn',
      format: logFormat,
      options: { flags: 'w' }
    })
  ]
});

module.exports = logger;
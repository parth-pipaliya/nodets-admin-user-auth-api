import winston from 'winston';

// Define your custom logger format (optional)
const loggerFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger instance
const logger = winston.createLogger({
    level: 'info', // Set the default logging level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        loggerFormat // Apply your custom format
    ),
    transports: [
        new winston.transports.Console() // Log to console
        // You can add more transports here (e.g., file transport)
    ]
});

// Export the logger instance
export default logger;
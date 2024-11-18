const winston = require('winston');

// Configurar Winston para registrar errores en un archivo
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Función middleware para manejar errores
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  logger.error(err.message);
  // Enviar una respuesta JSON con detalles del error
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err // Puedes personalizar la estructura de error si lo deseas
  });
};

module.exports = {
  AppError,
  globalErrorHandler,
};

const jwt = require('jsonwebtoken');
const { AppError } = require('../appError');

function verificarToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new AppError('Acceso no autorizado', 401));
    }

    try {
        const decoded = jwt.verify(token, "CLAVESECRETA");
        req.usuarioId = decoded.id; // Middleware
        next();
    } catch (error) {
        next(new AppError('Token no válido o expirado', 401));
    }
}

module.exports = verificarToken;
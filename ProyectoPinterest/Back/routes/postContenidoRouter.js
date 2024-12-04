const express = require('express');
const mongoose = require('mongoose');
const PostContenidoController = require('../controllers/postContenidoController')
const router = express.Router();
const { validatePostContenido } = require('../utils/validadorJSON');

// Middleware para validar el cuerpo de la petición antes de crear un postContenido
function validarPostContenido(req, res, next) {
    const isValid = validatePostContenido(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: 'Datos de postContenido inválidos',
            detalles: validatePostContenido.errors
        });
    }
    next();
}

router.get('/filtro/:filtro', PostContenidoController.obtenerPostContenidos);
router.get('/:id', PostContenidoController.obtenerPostContenidoPorId);
router.post('/', validarPostContenido, PostContenidoController.crearPostContenido);
router.put('/:id', validarPostContenido, PostContenidoController.actualizarPostContenido);
router.delete('/:id', PostContenidoController.eliminarPostContenidoPorId);

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const UsuarioController = require('../controllers/usuarioController')
const router = express.Router();
const { validateUsuario } = require('../utils/validadorJSON');

// Middleware para validar el cuerpo de la petición antes de crear un Usuario
function validarUsuario(req, res, next) {
    const isValid = validateUsuario(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: 'Datos de Usuario inválidos',
            detalles: validateUsuario.errors
        });
    }
    next();
}

router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id', UsuarioController.obtenerUsuarioPorId);
router.post('/', validarUsuario, UsuarioController.crearUsuario);
router.put('/:id', validarUsuario, UsuarioController.actualizarUsuario);
router.delete('/:id', UsuarioController.eliminarUsuarioPorId);

module.exports = router;
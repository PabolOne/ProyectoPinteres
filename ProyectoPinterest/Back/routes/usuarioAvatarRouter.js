const express = require('express');
const mongoose = require('mongoose');
const UsuarioAvatarController = require('../controllers/usuarioAvatarController')
const router = express.Router();
const { validateUsuarioAvatar } = require('../utils/validadorJSON');

// Middleware para validar el cuerpo de la petición antes de crear un usuarioAvatar
function validarUsuarioAvatar(req, res, next) {
    const isValid = validateUsuarioAvatar(req.body); 
    if (!isValid) {
        return res.status(400).json({
            error: 'Datos de usuarioAvatar inválidos',
            detalles: validateUsuarioAvatar.errors
        });
    }
    next();
}

router.get('/', UsuarioAvatarController.obtenerUsuarioAvatares);
router.get('/:id', UsuarioAvatarController.obtenerUsuarioAvatarPorId);
router.post('/', validarUsuarioAvatar, UsuarioAvatarController.crearUsuarioAvatar);
router.put('/:id', validarUsuarioAvatar, UsuarioAvatarController.actualizarUsuarioAvatar);
router.delete('/:id', UsuarioAvatarController.eliminarUsuarioAvatarPorId);

module.exports = router;
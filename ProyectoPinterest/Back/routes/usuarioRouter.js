const express = require('express');
const mongoose = require('mongoose');
const UsuarioController = require('../controllers/usuarioController')
const router = express.Router();
const verificarToken = require('../utils/Token/auth')
const { validateUsuario } = require('../utils/validadorJSON');

function validarUsuario(req, res, next) {
    const isValid = validateUsuario(req.body);
    if (!isValid) {
        console.log('Errores de validación:', validateUsuario.errors);
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
router.delete('/:id', verificarToken, UsuarioController.eliminarUsuarioPorId);
router.post('/login', UsuarioController.login);
router.post('/token', UsuarioController.obtenerIdToken);
router.post('/register', UsuarioController.register);
router.post('/:idUsuario/posts/:idPost', UsuarioController.actualizarUsuarioPostLikeados);
router.post('/:idUsuario/listas/:idLista', UsuarioController.añadirListaAUsuario)

module.exports = router;
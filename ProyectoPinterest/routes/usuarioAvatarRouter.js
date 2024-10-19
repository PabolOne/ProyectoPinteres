const express = require('express');
const UsuarioAvatarController = require('../controllers/usuarioAvatarController')
const router = express.Router();

router.get('/', UsuarioAvatarController.obtenerUsuarioAvatares);
router.get('/:id', UsuarioAvatarController.obtenerUsuarioAvatarPorId);
router.post('/', UsuarioAvatarController.crearUsuarioAvatar);
router.put('/:id', UsuarioAvatarController.actualizarUsuarioAvatar);
router.delete('/:id', UsuarioAvatarController.eliminarUsuarioAvatarPorId);

module.exports = router;
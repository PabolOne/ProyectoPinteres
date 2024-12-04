const express = require('express');
const mongoose = require('mongoose');
const verificarToken = require('../utils/Token/auth')
const PostController = require('../controllers/postController')
const router = express.Router();
const { validatePost } = require('../utils/validadorJSON');

// Middleware para validar el cuerpo de la petición antes de crear un Post
function validarPost(req, res, next) {
    const isValid = validatePost(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: 'Datos de Post inválidos',
            detalles: validatePost.errors
        });
    }
    next();
}

router.get('/', PostController.obtenerPosts);
router.get('/post/:id', PostController.obtenerPostPorId);
router.get('/:id', PostController.obtenerPostPorIdContenido);
router.post('/', verificarToken, validarPost, PostController.crearPost);
router.put('/:id', verificarToken, validarPost, PostController.actualizarPost);
router.delete('/:id', verificarToken, PostController.eliminarPostPorId);
router.post('/:idPostOriginal/posts/:idPost', PostController.agregarPost);

module.exports = router;
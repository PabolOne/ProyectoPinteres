const express = require('express');
const mongoose = require('mongoose');
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
router.get('/:id', PostController.obtenerPostPorId);
router.post('/', validarPost, PostController.crearPost);
router.put('/:id', validarPost, PostController.actualizarPost);
router.delete('/:id', PostController.eliminarPostPorId);

module.exports = router;
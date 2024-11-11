const express = require('express');
const PostController = require('../controllers/postController')
const router = express.Router();

router.get('/', PostController.obtenerPostPorId);
router.get('/:id', PostController.obtenerPostPorId);
router.post('/', PostController.crearPost);
router.put('/:id', PostController.actualizarPost);
router.delete('/:id', PostController.eliminarPostPorId);

module.exports = router;
const express = require('express');
const PostContenidoController = require('../controllers/postContenidoController')
const router = express.Router();

router.get('/', PostContenidoController.obtenerPostContenidoPorId);
router.get('/:id', PostContenidoController.obtenerPostContenidoPorId);
router.post('/', PostContenidoController.crearPostContenido);
router.put('/:id', PostContenidoController.actualizarPostContenido);
router.delete('/:id', PostContenidoController.eliminarPostContenidoPorId);

module.exports = router;
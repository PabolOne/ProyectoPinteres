const express = require('express');
const ListaController = require('../controllers/listaController')
const router = express.Router();

router.get('/', ListaController.obtenerListas);
router.get('/:id', ListaController.obtenerListaPorId);
router.post('/', ListaController.crearLista);
router.put('/:id', ListaController.actualizarLista);
router.delete('/:id', ListaController.eliminarListaPorId);

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const ListaController = require('../controllers/listaController')
const router = express.Router();
const { validateLista } = require('../utils/validadorJSON');

// Middleware para validar el cuerpo de la petición antes de crear una lista
function validarLista(req, res, next) {
    const isValid = validateLista(req.body);
    if (!isValid) {
        return res.status(400).json({
            error: 'Datos de lista inválidos',
            detalles: validateLista.errors
        });
    }
    next();
}

router.get('/', ListaController.obtenerListas);
router.get('/:id', ListaController.obtenerListaPorId);

router.post('/', validarLista, ListaController.crearLista);
router.put('/:id', validarLista, ListaController.actualizarLista);
router.delete('/:id', ListaController.eliminarListaPorId);
router.post('/:id/posts/:idPost', ListaController.agregarPostLista);

router.get('/:idUsuario', ListaController.obtenerListasPorUsuario);
module.exports = router;
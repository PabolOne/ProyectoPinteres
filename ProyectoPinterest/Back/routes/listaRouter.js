const express = require('express');
const mongoose = require('mongoose');
const ListaController = require('../controllers/listaController')
const router = express.Router();
const { validateLista } = require('../utils/validadorJSON');
const verificarToken = require('../utils/Token/auth')

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


router.get('/',verificarToken, ListaController.obtenerListas);
router.get('/:id', verificarToken, ListaController.obtenerListaPorId);
router.post('/', verificarToken, validarLista, ListaController.crearLista);
router.put('/:id',verificarToken , validarLista, ListaController.actualizarLista);
router.delete('/:id',verificarToken, ListaController.eliminarListaPorId);

module.exports = router;
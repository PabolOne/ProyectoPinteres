const mongoose = require('mongoose');

const postContenidoSchema = new mongoose.Schema({
    Contenido: [{
        type: String
    }]
});

module.exports = mongoose.model('PostContenido', postContenidoSchema);
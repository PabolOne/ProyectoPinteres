const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsuarioImg',
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);

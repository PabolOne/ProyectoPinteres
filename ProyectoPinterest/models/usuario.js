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
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un correo electrónico válido']
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

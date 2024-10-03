const mongoose = require('mongoose');

const usuarioAvatarSchema = new mongoose.Schema({
    avatar:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('UsuarioAvatar', usuarioAvatarSchema);
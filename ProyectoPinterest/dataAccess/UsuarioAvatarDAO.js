const UsuarioAvatar = require('../models/usuarioAvatar');

class UsuarioAvatarDAO{
    constructor(){

    }

    async crearUsuarioAvatar(usuarioAvatar){
        try{
            const nuevoUsuarioAvatar = new UsuarioAvatar(usuarioAvatar);
            return await nuevoUsuarioAvatar.save;
        } catch(error){
            throw error;
        }
    }

    async obtenerUsuarioAvatarPorId(id){
        try{
            return await UsuarioAvatar.findById(id);
        } catch(error){
            throw error;
        }
    }
    
    async obtenerUsuariosAvatar(limit = 10){
        try{
            return await UsuarioAvatar.find().limit(limit);
        } catch(error){
            throw error;
        }
    }

    async actualizarUsuarioAvatarPorId(id, usuarioAvatarData){
        try{
            return await UsuarioAvatar.findByIdAndUpdate(id, usuarioAvatarData, {new:true});
        } catch(error){
            throw error;
        }
    }

    async eliminarUsuarioAvatarPorId(id){
        try{
            return await UsuarioAvatar.findByIdAndRemove(id);
        } catch(error){
            throw error;
        }
    }
}

module.exports = new UsuarioAvatarDAO();
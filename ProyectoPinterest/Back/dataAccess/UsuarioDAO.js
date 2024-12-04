const Usuario = require('../models/usuario');

class UsuarioDAO{
    constructor(){}

    async crearUsuario(usuario){
        try{
            const nuevoUsuario = new Usuario(usuario);
            return await nuevoUsuario.save();
        } catch(error){
            throw error;
        }
    }

    async obtenerUsuarioPorId(id){
        try{
            return await Usuario.findById(id).populate('listas');
        } catch (error){
            throw error;
        }
    }

    async obtenerUsuarios(limit = 10){
        try{
            return await Usuario.find().limit(limit);
        } catch(error){
            throw error;
        }
    }

    async actualizarUsuarioPorId(id, usuarioData){
        try{
            return await Usuario.findByIdAndUpdate(id, usuarioData, {new:true});
        } catch (error){
            throw error;
        }
    }

    async eliminarUsuarioPorId(id){
        try{
            return await Usuario.findByIdAndDelete(id);
        } catch(error){
            throw error;
        }
    }

    async encontrarUsuarioPorEmail(correo) {
        return await Usuario.findOne({ correo });
    }

    async obtenerListasPorUsuario(idUsuario){
        try{
            const usuario = Usuario.findById(idUsuario);
        } catch(error){
            throw error;
        }
    }


}

module.exports = new UsuarioDAO();
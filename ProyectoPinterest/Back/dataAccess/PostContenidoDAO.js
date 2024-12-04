const PostContenido = require('../models/postContenido');

class PostContenidoDAO{
    constructor(){}

    async crearPostContenido(postContenido){
        try{
            const nuevoPostContenido = new PostContenido(postContenido);
            return await nuevoPostContenido.save();
        } catch (error){
            throw error;
        }
    }

    async obtenerPostContenidoPorId(id){
        try{
            return await PostContenido.findById(id);
        } catch (error){
            throw error;
        }
    }

    async obtenerPostContenidos(limit = 10, filtro = "") {
        try {
            console.log("ESTE ES EK FILTRO     :|" ,filtro,"|");
            const query = filtro ? { tags: { $in: [filtro] } } : {}; // Filtrar por tags si se proporciona un filtro
            return await PostContenido.find(query).limit(limit);
        } catch (error) {
            throw error;
        }
    }


    async actualizarPostContenidoPorId(id, postContenidoData){
        try{
            return await PostContenido.findByIdAndUpdate(id, postContenidoData, {new:true});
        } catch (error){
            throw error;
        }
    }

    async eliminarPostContenidoPorId(id){
        try{
            return await PostContenido.findByIdAndDelete(id);
        } catch(error){
            throw error; 
        }
    }
}

module.exports = new PostContenidoDAO();
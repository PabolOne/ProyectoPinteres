const Lista = require('../models/lista')

class ListaDAO{
    constructor(){}

    async crearLista(lista){
        const nuevaLista = new Lista(lista);
        return await nuevaLista.save();
    } catch(error){
        throw error;
    }

    async agregarPostsALista(id, posts){
        try{
            const lista = Lista.findById(id);
            if(!lista){
                throw new Error('No se encontró la lista.')
            }

            lista.posts.push(...posts.map(post =>({
                idPostOriginal: post.idPostOriginal,
                idUsuario: post.idUsuario,
                posts: post.posts,
                contenido: post.contenido,
                tags: post.tags,
                fechaHora: post.fechaHora,
                likes: post.likes
            })));

            return await lista.save();
        } catch (error){
            throw error;
        }
    }

    async obtenerListaPorId(id){
        try{
            return await Lista.findById(id);
        } catch(error){
            throw error;
        }
    }

    async obtenerListas(limit = 10){
        try{
            console.log('Esta es la lista', Lista.find().limit(limit));
            return await Lista.find().limit(limit);
        } catch(error){
            throw error;
        }
    }

    async actualizarListaPorId(id, listaData){
        try{
            return await Lista.findByIdAndUpdate(id, listaData, {new:true});
        } catch (error){
            throw error;
        }
    }

    async eliminarListaPorId(id){
        try{
            return await Lista.findByIdAndDelete(id);
        } catch (error){
            console.log('El error es', error);
            throw error;
        }
    }
}

module.exports = new ListaDAO();
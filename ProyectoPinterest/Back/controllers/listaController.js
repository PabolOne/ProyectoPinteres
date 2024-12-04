const ListaDAO = require('../dataAccess/ListaDAO');
const { AppError } = require('../utils/appError');


class ListaController {
    static async crearLista(req, res, next) {
        try {
            const {posts, nombre, descripcion } = req.body;

            if (!nombre) {
                next(new AppError('El campo nombre es requerido'))
            }
            if (!descripcion) {
                next(new AppError('El campo descripcion es requerido'))
            }
            
            const listaData = { posts, nombre, descripcion }
            const lista = await ListaDAO.crearLista(listaData);
            res.status(201).json(lista);
        } catch (error) {
            next(new AppError('Error al crear lista', 500))
        }
    }

    static async obtenerListaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const lista = await ListaDAO.obtenerListaPorId(id);

            if (!lista) {
                next(new AppError('Lista no encontrada', 404))
            }

            res.status(200).json(lista);
        } catch (error) {
            next(new AppError('Error al obtener la lista', 500))
        }
    }

    static async obtenerListas(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const listas = await ListaDAO.obtenerListas(10);

            if (!listas) {
                next(new AppError('Listas no encontradas', 404))
            }

            res.status(200).json(listas);
        } catch (error) {
            console.log('Este es el error', error);

            next(new AppError('Error al obtener las listas', 500))
        }
    }
    static async agregarPostLista(req, res, next) {
        try {
            const id = req.params.id;
            const idPost = req.params.idPost;
            const listaexists = await ListaDAO.obtenerListaPorId(id);

            if (!listaexists) {
                next(new AppError('Lista no encontrada', 404))
            }

            const listaData = listaexists;
            if (!listaData.posts.includes(idPost)) {
                listaData.posts.push(idPost); 
            } 
            const lista = await ListaDAO.actualizarListaPorId(id, listaData)

            if (!lista) {
                next(new AppError('Lista no encontrada', 404))
            }

            res.status(200).json(lista);
        } catch (error) {
            next(new AppError('Error al actualizar la lista', 500))
        }
    }
    static async actualizarLista(req, res, next) {
        try {
            const id = req.params.id;

            const listaexists = await ListaDAO.obtenerListaPorId(id);

            if (!listaexists) {
                next(new AppError('Lista no encontrada', 404))
            }

            const listaData = req.body;

            const lista = await ListaDAO.actualizarListaPorId(id, listaData)

            if (!lista) {
                next(new AppError('Lista no encontrada', 404))
            }

            res.status(200).json(lista);
        } catch (error) {
            next(new AppError('Error al actualizar la lista', 500))
        }
    }

    static async eliminarListaPorId(req, res, next) {
        try {
            const id = req.params.id;

            const lista = await ListaDAO.eliminarListaPorId(id);

            if (!lista) {
                next(new AppError('No se encontró la lista', 404));
            }

            res.status(200).json({ mensaje: 'Lista eliminada correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar la lista', 500))
        }
    }

}

module.exports = ListaController;

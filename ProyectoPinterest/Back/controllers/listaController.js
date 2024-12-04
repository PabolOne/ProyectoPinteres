const ListaDAO = require('../dataAccess/ListaDAO');
const { AppError } = require('../utils/appError');


class ListaController {
    static async crearLista(req, res, next) {
        try {
            const { nombre, descripcion } = req.body;
    
            if (!nombre) {
                return next(new AppError('El campo nombre es requerido', 400));
            }
            if (!descripcion) {
                return next(new AppError('El campo descripcion es requerido', 400));
            }
    
            const idUsuario = req.usuarioId;
    
            const nuevaLista = {
                idUsuario,
                posts: [],
                nombre,
                descripcion
            };
    
            const lista = await ListaDAO.crearLista(nuevaLista);
    
            res.status(201).json(lista);
        } catch (error) {
            next(new AppError('Error al crear lista', 500));
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

    static async obtenerListasPorUsuario(req, res, next) {
        try {
            const idUsuario = req.params.id;  // Obtener el idUsuario de los parámetros de la solicitud
            
            // Llamar al DAO para obtener las listas del usuario
            const listas = await ListaDAO.obtenerListasPorUsuario(idUsuario);
    
            if (!listas || listas.length === 0) {
                return next(new AppError('No se encontraron listas para este usuario', 404));
            }
    
            // Devolver las listas en la respuesta
            res.status(200).json(listas);
        } catch (error) {
            next(new AppError('Error al obtener las listas del usuario', 500));
        }
    }
    

}

module.exports = ListaController;

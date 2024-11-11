const PostContenidoDAO = require('../dataAccess/PostContenidoDAO');
const { AppError } = require('../utils/appError');


class postContenidoController {
    static async crearPostContenido(req, res, next) {
        try {
            const { contenido } = req.body;

            if (!contenido) {
                next(new AppError('El campo avatar es requerido'))
            }
            
            
            const postContenidoData = { contenido}
            const postContenido = await PostContenidoDAO.crearPostContenido(postContenidoData);
            res.status(201).json(postContenido);
        } catch (error) {
            next(new AppError('Error al crear post contenido', 500))
        }
    }

    static async obtenerPostContenidoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const postContenido = await PostContenidoDAO.obtenerPostContenidoPorId(id);

            if (!postContenido) {
                next(new AppError('Post contenido no encontrada', 404))
            }

            res.status(200).json(postContenido);
        } catch (error) {
            next(new AppError('Error al obtener el post contenido', 500))
        }
    }

    static async obtenerPostContenidos(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const postContenidos = await PostContenidoDAO.obtenerPostContenidos(limit);

            if (!postContenidos) {
                next(new AppError('Post contenidos no encontrados', 404))
            }

            res.status(200).json(postContenidos);
        } catch (error) {
            next(new AppError('Error al obtener los post contenido', 500))
        }
    }

    static async actualizarPostContenido(req, res, next) {
        try {
            const id = req.params.id;

            const postContenidoexists = await PostContenidoDAO.obtenerPostContenidoPorId(id);

            if (!postContenidoexists) {
                next(new AppError('Post contenido no encontrado', 404))
            }

            const postContenidoData = req.body;

            const postContenido = await PostContenidoDAO.actualizarPostContenidoPorId(id, postContenidoData)

            if (!postContenido) {
                next(new AppError('Post contenido no encontrado', 404))
            }

            res.status(200).json(postContenido);
        } catch (error) {
            next(new AppError('Error al actualizar el post contenido', 500))
        }
    }

    static async eliminarPostContenidoPorId(req, res, next) {
        try {
            const id = req.params.id;

            const postContenido = await PostContenidoDAO.eliminarPostContenidoPorId(id);

            if (!postContenido) {
                next(new AppError('No se encontró el post contenido', 404));
            }

            res.status(200).json({ mensaje: 'Post contenido eliminado correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar el post contenido', 500))
        }
    }

}

module.exports = postContenidoController;

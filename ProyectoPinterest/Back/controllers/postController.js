const PostDAO = require('../dataAccess/PostDAO');
const { AppError } = require('../utils/appError');


class postController {
    static async crearPost(req, res, next) {
        try {
            const { idPostOriginal, idUsuario, posts,descripcion, contenido, tags, fechaHora, likes } = req.body;
            
            if (!idUsuario) {

                return next(new AppError('El campo Usuario es requerido', 400));
            }
    
            const postData = { idPostOriginal, idUsuario, posts,descripcion, contenido, tags, fechaHora, likes };
            const post = await PostDAO.crearPost(postData);
            
            res.status(201).json(post);
        } catch (error) {
            console.log(error);
            next(new AppError('Error al crear post', 500)); 
    }
    }
    

    static async obtenerPostPorId(req, res, next) {
        try {
            const id = req.params.id;
            const post = await PostDAO.obtenerPostPorId(id);

            if (!post) {
                next(new AppError('Post  no encontrada', 404))
            }

            res.status(200).json(post);
        } catch (error) {
            next(new AppError('Error al obtener el post ', 500))
        }
    }
    static async obtenerPostPorIdContenido(req, res, next) {
        try {
            const id = req.params.id;
            const post = await PostDAO.obtenerPostsPorIdContenido(id);
            
            if (!post) {
                next(new AppError('Post  no encontrada', 404))
            }

            res.status(200).json(post);
        } catch (error) {
            next(new AppError('Error al obtener el post ', 500))
        }
    }
    static async obtenerPosts(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const posts = await PostDAO.obtenerPosts(limit);

            if (!posts) {
                next(new AppError('Posts no encontrados', 404))
            }

            res.status(200).json(posts);
        } catch (error) {
            next(new AppError('Error al obtener los post ', 500))
        }
    }

    static async actualizarPost(req, res, next) {
        try {
            const id = req.params.id;

            const postexists = await PostDAO.obtenerPostPorId(id);

            if (!postexists) {
                next(new AppError('Post  no encontrado', 404))
            }

            const postData = req.body;

            const post = await PostDAO.actualizarPostPorId(id, postData)

            if (!post) {
                next(new AppError('Post  no encontrado', 404))
            }

            res.status(200).json(post);
        } catch (error) {
            next(new AppError('Error al actualizar el post ', 500))
        }
    }
    static async darPostLikes(idPost) {
        try {
            const id = idPost;
            const postexists = await PostDAO.obtenerPostPorId(id);
            if (!postexists) {
            }
            const postData = postexists;

            postData.likes += 1;
            const post = await PostDAO.actualizarPostPorId(id, postData);

            if (!post) {
            }
        } catch (error) {
        }
    }
    static async quitarPostLikes(idPost) {
        try {
            const id = idPost;
            const postexists = await PostDAO.obtenerPostPorId(id);
            if (!postexists) {
            }            const postData = postexists;

            postData.likes -= 1;
            const post = await PostDAO.actualizarPostPorId(id, postData);

            if (!post) {
            }

        } catch (error) {
        }
    }

    static async eliminarPostPorId(req, res, next) {
        try {
            const id = req.params.id;

            const post = await PostDAO.eliminarPostPorId(id);

            if (!post) {
                next(new AppError('No se encontró el post ', 404));
            }

            res.status(200).json({ mensaje: 'Post  eliminado correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar el post ', 500))
        }
    }

}

module.exports = postController;

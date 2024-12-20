const PostDAO = require('../dataAccess/PostDAO');
const { AppError } = require('../utils/appError');
const PostContenidoDAO = require('../dataAccess/PostContenidoDAO');


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
    static async obtenerPostPorFiltro(req, res, next) {
        try {
            let filtro = req.params.filtro;
            if(filtro === "*")
            {
                filtro = "";
            }
                        
            const limit = req.query.limit || 16;
            
            const postContenidos = await PostDAO.obtenerPostPorFiltro(limit,filtro);
            console.log("Falla aca");
            if (!postContenidos) {
                next(new AppError('Post contenidos no encontrados', 404))
            }

            res.status(200).json(postContenidos);
        } catch (error) {
            next(new AppError('Error al obtener los post contenido', 500))
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
    static async agregarPost(req, res, next) {
        try {

            const {idPostOriginal,idPost} = req.params;
            const postData = await PostDAO.obtenerPostPorId(idPostOriginal);

            if (!postData) {
                next(new AppError('Post  no encontrado', 404))
            }

            postData.posts.push(idPost);
            console.log("Estos son los posts",postData);
            const post = await PostDAO.actualizarPostPorId(idPostOriginal, postData);

            if (!post) {
                next(new AppError('Post  no encontrado', 404))
            }

            res.status(200).json(post);
        } catch (error) {
            next(new AppError('Error al actualizar el post ', 500))
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

    static async obtenerPostContenidosPorIdUsuario(req, res, next) {
        try {
            const { idUsuario } = req.params;
            const limit = parseInt(req.query.limit, 10) || 10;
    
            console.log(idUsuario)
            // Llama al DAO para obtener los posts del usuario con su contenido relacionado
            const posts = await PostDAO.obtenerPostContenidosPorIdUsuario(idUsuario, limit);
    
            if (!posts || posts.length === 0) {
                return next(new AppError('No se encontraron posts para este usuario', 404));
            }
    
            res.status(200).json(posts);
        } catch (error) {
            next(new AppError('Error al obtener los posts contenidos por idUsuario', 500));
        }
    }

} 

module.exports = postController;

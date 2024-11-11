const UsuarioAvatarDAO = require('../dataAccess/UsuarioAvatarDAO');
const { AppError } = require('../utils/appError');


class UsuarioAvatarController {
    static async crearUsuarioAvatar(req, res, next) {
        try {
            const { avatar } = req.body;

            if (!avatar) {
                next(new AppError('El campo avatar es requerido'))
            }
            
            
            const usuarioAvatarData = { avatar}
            const usuarioAvatar = await UsuarioAvatarDAO.crearUsuarioAvatar(usuarioAvatarData);
            res.status(201).json(usuarioAvatar);
        } catch (error) {
            next(new AppError('Error al crear usuario avatar', 500))
        }
    }

    static async obtenerUsuarioAvatarPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioAvatar = await UsuarioAvatarDAO.obtenerUsuarioAvatarPorId(id);

            if (!usuarioAvatar) {
                next(new AppError('Usuario avatar no encontrada', 404))
            }

            res.status(200).json(usuarioAvatar);
        } catch (error) {
            next(new AppError('Error al obtener el usuario avatar', 500))
        }
    }

    static async obtenerUsuarioAvatares(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const usuariosAvatar = await UsuarioAvatarDAO.obtenerUsuariosAvatar(limit);

            if (!usuariosAvatar) {
                next(new AppError('Usuarios Avatar no encontradas', 404))
            }

            res.status(200).json(usuariosAvatar);
        } catch (error) {
            next(new AppError('Error al obtener las usuarios avatar', 500))
        }
    }

    static async actualizarUsuarioAvatar(req, res, next) {
        try {
            const id = req.params.id;

            const usuarioAvatarexists = await UsuarioAvatarDAO.obtenerUsuarioAvatarPorId(id);

            if (!usuarioAvatarexists) {
                next(new AppError('Usuario avatar no encontrado', 404))
            }

            const usuarioAvatarData = req.body;

            const usuarioAvatar = await UsuarioAvatarDAO.actualizarUsuarioAvatarPorId(id, usuarioAvatarData)

            if (!usuarioAvatar) {
                next(new AppError('Usuario avatar no encontrado', 404))
            }

            res.status(200).json(usuarioAvatar);
        } catch (error) {
            next(new AppError('Error al actualizar el usuario avatar', 500))
        }
    }

    static async eliminarUsuarioAvatarPorId(req, res, next) {
        try {
            const id = req.params.id;

            const usuarioAvatar = await UsuarioAvatarDAO.eliminarUsuarioAvatarPorId(id);

            if (!usuarioAvatar) {
                next(new AppError('No se encontró el usuario avatar', 404));
            }

            res.status(200).json({ mensaje: 'Usuario avatar eliminado correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar el usuario avatar', 500))
        }
    }

}

module.exports = UsuarioAvatarController;

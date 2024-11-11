const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const { AppError } = require('../utils/appError');


class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { username,nombre,correo,avatar } = req.body;

            if (!username) {
                next(new AppError('El campo username es requerido'))
            }
            if (!nombre) {
                next(new AppError('El campo nombre es requerido'))
            }
            if (!correo) {
                next(new AppError('El campo correo es requerido'))
            }
            if (!avatar) {
                next(new AppError('El campo avatar es requerido'))
            }
            const usuarioData = { username,nombre,correo,avatar }
            const usuario = await UsuarioDAO.crearUsuario(usuarioData);
            res.status(201).json(usuario);
        } catch (error) {
            next(new AppError('Error al crear usuario ', 500))
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await UsuarioDAO.obtenerUsuarioPorId(id);

            if (!usuario) {
                next(new AppError('Usuario  no encontrada', 404))
            }

            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al obtener el usuario ', 500))
        }
    }

    static async obtenerUsuarios(req, res, next) {
        try {

            const limit = req.query.limit || 10;
            const usuarios = await UsuarioDAO.obtenerUsuarios(limit);

            if (!usuarios) {
                next(new AppError('Usuarios  no encontradas', 404))
            }

            res.status(200).json(usuarios);
        } catch (error) {
            next(new AppError('Error al obtener las usuarios ', 500))
        }
    }

    static async actualizarUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const usuarioexists = await UsuarioDAO.obtenerUsuarioPorId(id);

            if (!usuarioexists) {
                next(new AppError('Usuario  no encontrado', 404))
            }

            const usuarioData = req.body;

            const usuario = await UsuarioDAO.actualizarUsuarioPorId(id, usuarioData)

            if (!usuario) {
                next(new AppError('Usuario  no encontrado', 404))
            }

            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al actualizar el usuario ', 500))
        }
    }

    static async eliminarUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;

            const usuario = await UsuarioDAO.eliminarUsuarioPorId(id);

            if (!usuario) {
                next(new AppError('No se encontró el usuario ', 404));
            }

            res.status(200).json({ mensaje: 'Usuario  eliminado correctamente' });
        } catch (error) {
            next(new AppError('Error al eliminar el usuario ', 500))
        }
    }

}

module.exports = UsuarioController;

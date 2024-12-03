const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { username,nombre,correo,avatar,password } = req.body;

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
            if (!password) {
                next(new AppError('El campo password es requerido'))
            }

            const usuarioData = { username,nombre,correo,avatar,password: password }
            const usuario = await UsuarioDAO.crearUsuario(usuarioData);
            const token = UsuarioController.generarToken(usuario._id);

            res.status(201).json({ usuario, token });
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
            console.log('ID recibido:', id);
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log('ID inválido');
                return next(new AppError('ID de usuario inválido', 400));
            }
    
            const usuario = await UsuarioDAO.eliminarUsuarioPorId(id);
            console.log('Resultado de la eliminación:', usuario);
    
            if (!usuario) {
                console.log('Usuario no encontrado');
                return next(new AppError('No se encontró el usuario', 404));
            }
    
            res.status(200).json({ 
                status: 'success', 
                mensaje: 'Usuario eliminado correctamente' 
            });
        } catch (error) {
            console.error('Error capturado:', error);
            next(new AppError('Error al eliminar el usuario', 500));
        }
    }
    
    

    static generarToken(userId){
        return jwt.sign({ id: userId }, "CLAVESECRETA", { expiresIn: '1h' });

    }

    static async login(req, res, next) {
        try {
            const { correo, password } = req.body;

            const usuario = await UsuarioDAO.encontrarUsuarioPorEmail(correo);

            if (!usuario) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Correo incorrecto',
                });
            }

            if (password !== usuario.password) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Contraseña incorrecta',
                });
            }


            const token = UsuarioController.generarToken(usuario._id);


            return res.status(200).json({
                status: 'success',
                message: 'Login exitoso',
                usuario: { _id: usuario._id, nombre: usuario.nombre, correo: usuario.correo },
                token,
            });
        } catch (error) {
            next(error);
        }
    }
    


    static async register(req, res, next) {
        try {
            const { username, firstName, lastName, email, avatar, password} = req.body;
        
            if (!username || !firstName || !lastName || !email || !avatar || !password) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Todos los campos son obligatorios: usuario, nombre, apellidos, correo, avatar y contraseña',
                });
            }
    
            const usuarioExistente = await UsuarioDAO.encontrarUsuarioPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    status: 'fail',
                    message: 'El correo ya está registrado',
                });
            }
    
            const nombreCompleto = `${firstName} ${lastName}`;
    
            console.log('este es el avatar', avatar);

            const nuevoUsuario = await UsuarioDAO.crearUsuario({
                username,
                nombre: nombreCompleto,
                correo: email,
                avatar: avatar,
                password,
            });
    
            const token = UsuarioController.generarToken(nuevoUsuario._id);
    
            return res.status(201).json({
                status: 'success',
                message: 'Registro exitoso',
                usuario: {
                    _id: nuevoUsuario._id,
                    username: nuevoUsuario.username,
                    nombre: nuevoUsuario.nombre,
                    correo: nuevoUsuario.correo,
                    avatar: nuevoUsuario.avatar,
                },
                token,
            });
        } catch (error) {
            next(error);
        }
    }
    
    
    

}

module.exports = UsuarioController;

const db = require('./config/db');
const ListaDAO = require('./dataAccess/ListaDAO');
const PostContenidoDAO = require('./dataAccess/PostContenidoDAO');
const PostDAO = require('./dataAccess/PostDAO');
const UsuarioAvatarDAO = require('./dataAccess/UsuarioAvatarDAO');
const UsuarioDAO = require('./dataAccess/UsuarioDAO');
const fs = require('fs');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
async function main() {
    try {


        await db.conectar();

        console.log('Conexión establecida con éxito');


        //crear usuario avatar para convertir una imagen y ponerla en el usuario
        var base64Image = '12sa';
        const data = fs.readFileSync('./img/FotoparaTICxd.jpg');
        base64Image = data.toString('base64');
        console.log(base64Image);
        await UsuarioAvatarDAO.crearUsuarioAvatar({ avatar: base64Image }).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        var avatar;
        //Obtener usuario avatar por id para ver si se puede convertir en imagen denuevo
        await UsuarioAvatarDAO.obtenerUsuarioAvatarPorId({ _id: new ObjectId('670204eb7753c72be7f13d58') })
        .then(respuesta => {
              avatar  = respuesta.avatar;
            console.log('Éxito', avatar);
        })
        .catch(error => {
            console.log('Error', error);
        });
        const buffer = Buffer.from(avatar, 'base64');

        // Escribe el buffer en un archivo de imagen
        fs.writeFile('imagen_salida.jpg', buffer, (err) => {
            if (err) {
                console.error('Error al escribir la imagen:', err);
                return;
            }
            console.log('Imagen guardada con éxito!');
        });

        //creando Usuario DAB xd lol omg rubius PUBG
        await UsuarioDAO.crearUsuario({ username: 'Luis', nombre: 'Pabol', correo:'hola@gmail.com',  avatar: new ObjectId('670204eb7753c72be7f13d58') }).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        //Al usuario le vamos hacer de todo para ver q pex
        await UsuarioDAO.obtenerUsuarioPorId( new ObjectId('67020ca70f10be185fbdf768') ).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        await UsuarioDAO.obtenerUsuarioPorId(2).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });

        await UsuarioDAO.actualizarUsuarioPorId(new ObjectId('67020ca70f10be185fbdf768'),{ username: 'MEACTUALIZARON', nombre: 'MARCOSGOD', correo:'holaMUNDO@gmail.com',  avatar: new ObjectId('670204eb7753c72be7f13d58') }).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        await UsuarioDAO.eliminarUsuarioPorId( new ObjectId('670211caf3f70d2eab6aed75') ).then(respuesta => {
            console.log('Exito', respuesta);
        });
        //Lo mismo pero con post yo creo que todo esta bn
        await PostContenidoDAO.crearPostContenido({ contenido: [base64Image,base64Image,base64Image] }).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        //Creando un post asi de los que me aviento en feis jaja xd
        await PostDAO.crearPost({idUsuario:  new ObjectId('67020ca70f10be185fbdf768'),contenido: new ObjectId('67020dee75b63d50ac597869'),tags: ["luis","jsadj"],fechaHora: new Date(),likes: 1}).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        // yanose que poner pero lo pongo pa serparar aqui son las listas bro
        await ListaDAO.crearLista({idUsuario:  new ObjectId('67020ca70f10be185fbdf768'),posts: [new ObjectId('6702110b04f83dce30a29f9e')],nombre: 'HolaMundoEnExpress', descripcion: 'NonoNO'}).then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });
        //Busqueda filtrada por tag
        await PostDAO.obtenerPostsPorTag("luis").then(respuesta => {
            console.log('Exito', respuesta);
        }
        ).catch(error => {
            console.log('Error', error);
        });

        await db.desconectar();
        console.log('desconexion establecida con exito');




    } catch (error) {
        console.log(error);
    }
}
main()
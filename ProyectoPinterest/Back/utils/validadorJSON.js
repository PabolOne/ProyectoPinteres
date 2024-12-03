const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv();
addFormats(ajv); // Agrega soporte para formatos como "date-time"

// Esquemas
const listaSchema = {
    type: 'object',
    properties: {
        nombre: { type: 'string', minLength: 1 },
        descripcion: { type: 'string' },
        posts: {
            type: 'array',
            items: { type: 'string' }
        }
    },
    required: ['nombre'], 
    additionalProperties: false
};


const postSchema = {
    type: 'object',
    properties: {
        idPostOriginal: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        idUsuario: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        posts: {
            type: 'array',
            items: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        },
        descripcion: { type: 'string'},
        contenido: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
        tags: {
            type: 'array',
            items: { type: 'string' }
        },
        fechaHora: { type: 'string', format: 'date-time' }, // Soportado gracias a ajv-formats
        likes: { type: 'integer', minimum: 0 }
    },
    required: [],
    additionalProperties: false
};

const postContenidoSchema = {
    type: 'object',
    properties: {
        contenido: {
            type: 'string' 
        }
    },
    required: ['contenido'],
    additionalProperties: false
};

const usuarioSchema = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 1 },
        nombre: { type: 'string', minLength: 1 },
        correo: { type: 'string', format: 'email' },
        avatar: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }, // ID de MongoDB
        password: { type: 'string', minLength: 6 }
    },
    required: ['username', 'nombre', 'correo', 'avatar', 'password'],
    additionalProperties: false
};

const usuarioAvatarSchema = {
    type: 'object',
    properties: {
        avatar: { type: 'string', minLength: 1 }
    },
    required: ['avatar'],
    additionalProperties: false
};

// Validador de los esquemas
const validateLista = ajv.compile(listaSchema);
const validatePost = ajv.compile(postSchema);
const validatePostContenido = ajv.compile(postContenidoSchema);
const validateUsuario = ajv.compile(usuarioSchema);
const validateUsuarioAvatar = ajv.compile(usuarioAvatarSchema);

module.exports = {
    validateLista,
    validatePost,
    validatePostContenido,
    validateUsuario,
    validateUsuarioAvatar
};

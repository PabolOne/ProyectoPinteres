const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioDAO = require('./dataAccess/UsuarioDAO');

const app = express();
const PORT = 3000;
const SECRET_KEY = "claveSecreta"; 

app.use(express.json()); 
mongoose.connect('mongodb://localhost/pinterest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

app.post('/register', async (req, res) => {
    const { username, nombre, correo, password, avatar } = req.body;

    try {
        const existingUser = await UsuarioDAO.encontrarUsuarioPorEmail(correo);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = {
            username,
            nombre,
            correo,
            avatar,
            password: hashedPassword
        };

        await UsuarioDAO.crearUsuario(newUser);
        res.json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el registro", error:error.message });
    }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    try {
        const user = await UsuarioDAO.encontrarUsuarioPorEmail(correo);
        
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Intentando iniciar sesión con ${correo} y contraseña ${password}. Contraseña REAL: ${user.password}`); // Agregar log
        console.log(`Contraseña válida: ${isPasswordValid}`); // Log del resultado de la comparación
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, correo: user.correo },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error:error.message });
    }
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "Acceso a la ruta protegida concedido", user: req.user });
});

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

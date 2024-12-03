const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../../dataAccess/UsuarioDAO');
const verificarToken = require('./auth');

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

    console.log('Request Body:', req.body); // Agregado para depuración

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
        console.log(`Intentando iniciar sesión con ${correo} y contraseña ${password}. Contraseña REAL: ${user.password}`); 
        console.log(`Contraseña válida: ${isPasswordValid}`); 
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

app.get('/protected', verificarToken    , (req, res) => {
    res.json({ message: "Acceso a la ruta protegida concedido", user: req.user });
});

app.get

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

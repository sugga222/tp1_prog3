const fs = require("fs").promises;
const path = require("path");

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarPassword = (password) => {
    return password && typeof password === "string" && password.length >= 1;
};

const loginUsuario = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log(`📨 POST /login - Intento de login para: ${email}`);

        // Validaciones
        if (!email || !password) {
            console.warn("⚠️  Campos faltantes en login");
            return res.status(400).json({
                mensaje: "Email y contraseña son requeridos"
            });
        }

        if (!validarEmail(email)) {
            console.warn(`⚠️  Email inválido: ${email}`);
            return res.status(400).json({
                mensaje: "Email inválido"
            });
        }

        if (!validarPassword(password)) {
            console.warn("⚠️  Contraseña inválida");
            return res.status(400).json({
                mensaje: "Contraseña inválida"
            });
        }

        const rutaArchivo = path.resolve("data/usuarios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const usuarios = JSON.parse(data);

        const usuarioEncontrado = usuarios.find(
            usuario =>
                usuario.email === email &&
                usuario.password === password
        );

        if (!usuarioEncontrado) {

            console.warn(`✗ Login fallido para: ${email}`);
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

        console.log(`✓ Login exitoso para: ${usuarioEncontrado.nombre}`);

        res.status(200).json({
            mensaje: "Login exitoso",
            user: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                email: usuarioEncontrado.email,
                fechaRegistro: usuarioEncontrado.fechaRegistro
            }
        });

    } catch (error) {

        console.error("✗ Error en POST /login:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    loginUsuario
};
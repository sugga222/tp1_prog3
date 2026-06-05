const fs = require("fs").promises;
const path = require("path");

const loginUsuario = async (req, res) => {

    try {

        const { email, password } = req.body;

        const rutaArchivo = path.resolve("data/usuarios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const usuarios = JSON.parse(data);

        const usuarioEncontrado = usuarios.find(
            usuario =>
                usuario.email === email &&
                usuario.password === password
        );

        if (!usuarioEncontrado) {

            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            });
        }

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

        console.log("Error en login:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    loginUsuario
};
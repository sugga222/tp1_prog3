const fs = require("fs").promises;
const path = require("path");

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarPassword = (password) => {
    return password && typeof password === "string" && password.length >= 1;
};

const registroUsuario = async (req, res) => {

    try {

        const { nombre, apellido, email, password } = req.body;

        console.log(`📨 POST /registro - Nuevo usuario: ${nombre} ${apellido}`);

        // Validaciones
        if (!nombre || !apellido || !email || !password) {
            console.warn("⚠️  Campos faltantes en registro");
            return res.status(400).json({
                mensaje: "Todos los campos son requeridos (nombre, apellido, email, password)"
            });
        }

        if (typeof nombre !== "string" || nombre.trim() === "") {
            console.warn("⚠️  Nombre inválido");
            return res.status(400).json({
                mensaje: "Nombre inválido"
            });
        }

        if (typeof apellido !== "string" || apellido.trim() === "") {
            console.warn("⚠️  Apellido inválido");
            return res.status(400).json({
                mensaje: "Apellido inválido"
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
                mensaje: "Contraseña inválida (mínimo 1 carácter)"
            });
        }

        const rutaArchivo = path.resolve("data/usuarios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const usuarios = JSON.parse(data);

        // Verificar que el email no ya existe
        const emailExistente = usuarios.find(usuario => usuario.email === email);

        if (emailExistente) {
            console.warn(`✗ Email duplicado: ${email}`);
            return res.status(409).json({
                mensaje: "El email ya está registrado"
            });
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: email.trim(),
            password: password,
            fechaRegistro: new Date().toISOString().split("T")[0]
        };

        usuarios.push(nuevoUsuario);

        // Guardar en archivo
        await fs.writeFile(rutaArchivo, JSON.stringify(usuarios, null, 2));

        console.log(`✓ Usuario registrado: ${nuevoUsuario.nombre} (ID: ${nuevoUsuario.id})`);

        res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            user: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                email: nuevoUsuario.email,
                fechaRegistro: nuevoUsuario.fechaRegistro
            }
        });

    } catch (error) {

        console.error("✗ Error en POST /registro:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    registroUsuario
};

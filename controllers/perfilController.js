const fs = require("fs").promises;
const path = require("path");

const obtenerPerfilPorId = async (req, res) => {

    try {

        const { id } = req.params;

        console.log(`📨 GET /perfil/${id} - Obteniendo perfil de usuario`);

        // Validar que el ID sea numérico
        if (!id || isNaN(id)) {
            console.warn(`⚠️  ID inválido: ${id}`);
            return res.status(400).json({
                mensaje: "ID inválido. Debe ser un número"
            });
        }

        const rutaArchivo = path.resolve("data/perfiles.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const perfiles = JSON.parse(data);

        const perfilEncontrado = perfiles.find(
            perfil => perfil.id == id
        );

        if (!perfilEncontrado) {

            console.warn(`⚠️  Perfil no encontrado: ID ${id}`);
            return res.status(404).json({
                mensaje: "Perfil no encontrado"
            });
        }

        console.log(`✓ Perfil encontrado: ${perfilEncontrado.nombre}`);

        res.status(200).json(perfilEncontrado);

        console.log("✓ Respuesta enviada correctamente");

    } catch (error) {

        console.error("✗ Error en GET /perfil/:id:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerPerfilPorId
};
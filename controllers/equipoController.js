const fs = require("fs").promises;
const path = require("path");

const obtenerEquipo = async (req, res) => {

    try {

        console.log("📨 GET /equipo - Obteniendo información del equipo");

        const rutaArchivo = path.resolve("data/equipo.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const equipo = JSON.parse(data);

        console.log(`✓ ${equipo.length} integrantes del equipo cargados`);

        res.status(200).json(equipo);

        console.log("✓ Respuesta enviada correctamente");

    } catch (error) {

        console.error("✗ Error en GET /equipo:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerEquipo
};
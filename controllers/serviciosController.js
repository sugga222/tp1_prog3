const fs = require("fs").promises;
const path = require("path");

const obtenerServicios = async (req, res) => {

    try {

        console.log("📨 GET /servicios - Obteniendo lista de servicios");

        const rutaArchivo = path.resolve("data/servicios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const servicios = JSON.parse(data);

        console.log(`✓ ${servicios.length} servicios encontrados en la BD`);

        res.status(200).json(servicios);

        console.log("✓ Respuesta enviada correctamente");

    } catch (error) {

        console.error("✗ Error en GET /servicios:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

const obtenerServicioPorId = async (req, res) => {

    try {

        const { id } = req.params;

        console.log(`📨 GET /servicios/${id} - Buscando servicio`);

        // Validar que el ID sea numérico
        if (!id || isNaN(id)) {
            console.warn(`⚠️  ID inválido: ${id}`);
            return res.status(400).json({
                mensaje: "ID inválido. Debe ser un número"
            });
        }

        const rutaArchivo = path.resolve("data/servicios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const servicios = JSON.parse(data);

        const servicioEncontrado = servicios.find(
            servicio => servicio.id == id
        );

        if (!servicioEncontrado) {

            console.warn(`⚠️  Servicio no encontrado: ID ${id}`);
            return res.status(404).json({
                mensaje: "Servicio no encontrado"
            });
        }

        console.log(`✓ Servicio encontrado: ${servicioEncontrado.nombre}`);

        res.status(200).json(servicioEncontrado);

        console.log("✓ Respuesta enviada correctamente");

    } catch (error) {

        console.error("✗ Error en GET /servicios/:id:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerServicios,
    obtenerServicioPorId
};
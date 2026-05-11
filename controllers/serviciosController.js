const fs = require("fs").promises;
const path = require("path");

const obtenerServicios = async (req, res) => {

    try {

        const rutaArchivo = path.resolve("data/servicios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const servicios = JSON.parse(data);

        res.status(200).json(servicios);

    } catch (error) {

        console.log("Error al obtener servicios:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

const obtenerServicioPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const rutaArchivo = path.resolve("data/servicios.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const servicios = JSON.parse(data);

        const servicioEncontrado = servicios.find(
            servicio => servicio.id == id
        );

        if (!servicioEncontrado) {

            return res.status(404).json({
                mensaje: "Servicio no encontrado"
            });
        }

        res.status(200).json(servicioEncontrado);

    } catch (error) {

        console.log("Error al obtener servicio:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerServicios,
    obtenerServicioPorId
};
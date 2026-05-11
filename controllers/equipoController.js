const fs = require("fs").promises;
const path = require("path");

const obtenerEquipo = async (req, res) => {

    try {

        const rutaArchivo = path.resolve("data/equipo.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const equipo = JSON.parse(data);

        res.status(200).json(equipo);

    } catch (error) {

        console.log("Error al obtener equipo:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerEquipo
};
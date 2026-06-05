const fs = require("fs").promises;
const path = require("path");

const obtenerPerfilPorId = async (req, res) => {

    try {

        const { id } = req.params;

        const rutaArchivo = path.resolve("data/perfiles.json");

        const data = await fs.readFile(rutaArchivo, "utf-8");

        const perfiles = JSON.parse(data);

        const perfilEncontrado = perfiles.find(
            perfil => perfil.id == id
        );

        if (!perfilEncontrado) {

            return res.status(404).json({
                mensaje: "Perfil no encontrado"
            });
        }

        res.status(200).json(perfilEncontrado);

    } catch (error) {

        console.log("Error al obtener perfil:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

module.exports = {
    obtenerPerfilPorId
};
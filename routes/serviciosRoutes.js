const express = require("express");

const router = express.Router();

const {
    obtenerServicios,
    obtenerServicioPorId
} = require("../controllers/serviciosController");

router.get("/", obtenerServicios);

router.get("/:id", obtenerServicioPorId);

module.exports = router;
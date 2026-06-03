const express = require("express");

const router = express.Router();

const {
    obtenerEquipo
} = require("../controllers/equipoController");

router.get("/", obtenerEquipo);

module.exports = router;
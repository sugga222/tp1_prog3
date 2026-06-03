const express = require("express");

const router = express.Router();

const {
    obtenerPerfilPorId
} = require("../controllers/perfilController");

router.get("/:id", obtenerPerfilPorId);

module.exports = router;
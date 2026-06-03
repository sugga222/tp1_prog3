const express = require("express");

const router = express.Router();

const {
    registroUsuario
} = require("../controllers/registroController");

router.post("/", registroUsuario);

module.exports = router;

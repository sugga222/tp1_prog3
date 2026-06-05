const express = require("express");
const cors = require("cors");
require("dotenv").config();

const serviciosRoutes = require("./routes/serviciosRoutes");
const equipoRoutes = require("./routes/equipoRoutes");
const perfilRoutes = require("./routes/perfilRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/servicios", serviciosRoutes);
app.use("/equipo", equipoRoutes);
app.use("/perfil", perfilRoutes);
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

module.exports = app;

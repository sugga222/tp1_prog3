const express = require("express");

const cors = require("cors");

require("dotenv").config();

const serviciosRoutes = require("./routes/serviciosRoutes");

const equipoRoutes = require("./routes/equipoRoutes");

const perfilRoutes = require("./routes/perfilRoutes");

const loginRoutes = require("./routes/loginRoutes");

const registroRoutes = require("./routes/registroRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

console.log("═══════════════════════════════════════════");
console.log("🚀 INICIANDO API REST - TP3");
console.log("═══════════════════════════════════════════");

// Middlewares
app.use(cors());

console.log("✓ CORS habilitado");

app.use(express.json());

console.log("✓ Middleware JSON configurado");


// Rutas
app.use("/servicios", serviciosRoutes);

app.use("/equipo", equipoRoutes);

app.use("/perfil", perfilRoutes);

app.use("/login", loginRoutes);

app.use("/registro", registroRoutes);

console.log("✓ Todas las rutas cargadas");


// Ruta principal
app.get("/", (req, res) => {

    console.log("📨 GET / - Health check");

    res.json({
        mensaje: "API funcionando correctamente",
        version: "1.0.0",
        endpoints: {
            servicios: "GET /servicios",
            servicioId: "GET /servicios/:id",
            equipo: "GET /equipo",
            perfil: "GET /perfil/:id",
            login: "POST /login",
            registro: "POST /registro"
        }
    });

});


// Servidor
app.listen(PORT, () => {

    console.log(`✓ Servidor corriendo en puerto ${PORT}`);
    console.log("═══════════════════════════════════════════");
    console.log(`🌐 URL Local: http://localhost:${PORT}`);
    console.log(`🌐 URL Render: https://tp1-prog3-791r.onrender.com`);
    console.log("═══════════════════════════════════════════\n");

});
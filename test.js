// Test script para verificar endpoints
// Ejecutar con: node test.js

const BASE_URL = "http://localhost:3000";

// Colores para la consola
const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    yellow: "\x1b[33m",
    reset: "\x1b[0m"
};

const log = {
    success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
    info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
    test: (msg) => console.log(`${colors.yellow}\n→ ${msg}${colors.reset}`)
};

async function runTests() {
    log.info("Iniciando tests de API...\n");

    try {
        // TEST 1: GET /
        log.test("GET / - Verificar que API está funcionando");
        let res = await fetch(`${BASE_URL}/`);
        if (res.ok) {
            const data = await res.json();
            log.success(`API OK: ${data.mensaje}`);
        } else {
            log.error("API no responde");
            return;
        }

        // TEST 2: GET /servicios
        log.test("GET /servicios - Obtener lista de servicios");
        res = await fetch(`${BASE_URL}/servicios`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 13) {
                log.success(`${data.length} servicios obtenidos (✓ Más de 13)`);
            } else {
                log.error(`Solo ${data.length} servicios (Se requerían >13)`);
            }
        } else {
            log.error("No se pudieron obtener servicios");
        }

        // TEST 3: GET /servicios/:id
        log.test("GET /servicios/1 - Obtener servicio por ID");
        res = await fetch(`${BASE_URL}/servicios/1`);
        if (res.ok) {
            const data = await res.json();
            log.success(`Servicio obtenido: ${data.nombre}`);
        } else {
            log.error("No se pudo obtener el servicio");
        }

        // TEST 4: GET /servicios/999 (no existe)
        log.test("GET /servicios/999 - Verificar error 404");
        res = await fetch(`${BASE_URL}/servicios/999`);
        if (res.status === 404) {
            log.success("Error 404 correcto para servicio inexistente");
        } else {
            log.error("Debería retornar 404");
        }

        // TEST 5: GET /equipo
        log.test("GET /equipo - Obtener info del equipo");
        res = await fetch(`${BASE_URL}/equipo`);
        if (res.ok) {
            const data = await res.json();
            log.success(`${data.length} integrantes del equipo obtenidos`);
        } else {
            log.error("No se pudo obtener el equipo");
        }

        // TEST 6: GET /perfil/:id
        log.test("GET /perfil/1 - Obtener perfil de usuario");
        res = await fetch(`${BASE_URL}/perfil/1`);
        if (res.ok) {
            const data = await res.json();
            log.success(`Perfil obtenido: ${data.nombre}`);
        } else {
            log.error("No se pudo obtener el perfil");
        }

        // TEST 7: POST /login - Success
        log.test("POST /login - Login exitoso");
        res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "manuaguilar420@gmail.com",
                password: "1234"
            })
        });
        if (res.ok) {
            const data = await res.json();
            log.success(`Login exitoso: ${data.user.nombre}`);
        } else {
            log.error("Login fallido");
        }

        // TEST 8: POST /login - Error email/password
        log.test("POST /login - Credenciales incorrectas");
        res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "noexiste@gmail.com",
                password: "wrongpass"
            })
        });
        if (res.status === 401) {
            log.success("Error 401 correcto para credenciales incorrectas");
        } else {
            log.error("Debería retornar 401");
        }

        // TEST 9: POST /login - Validación email vacío
        log.test("POST /login - Validación de campos requeridos");
        res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "",
                password: ""
            })
        });
        if (res.status === 400) {
            log.success("Error 400 correcto para campos requeridos");
        } else {
            log.error("Debería retornar 400");
        }

        // TEST 10: POST /registro - Success
        log.test("POST /registro - Registro de nuevo usuario");
        res = await fetch(`${BASE_URL}/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: "TestUsuario",
                apellido: "TestApellido",
                email: `test${Date.now()}@gmail.com`,
                password: "1234"
            })
        });
        if (res.status === 201) {
            const data = await res.json();
            log.success(`Usuario registrado: ${data.user.nombre}`);
        } else {
            log.error("No se pudo registrar usuario");
        }

        // TEST 11: POST /registro - Email duplicado
        log.test("POST /registro - Verificar email duplicado");
        res = await fetch(`${BASE_URL}/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: "TestUsuario",
                apellido: "TestApellido",
                email: "manuaguilar420@gmail.com",
                password: "1234"
            })
        });
        if (res.status === 409) {
            log.success("Error 409 correcto para email duplicado");
        } else {
            log.error("Debería retornar 409 para email duplicado");
        }

        log.info("\n✓ Tests completados");

    } catch (error) {
        log.error(`Error durante testing: ${error.message}`);
        log.info("¿Está el servidor corriendo en http://localhost:3000?");
    }
}

runTests();

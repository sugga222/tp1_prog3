
# Servitech - Soluciones Digitales

Plataforma web educativa/profesional que muestra servicios (Desarrollo Web, UI/UX, Automatización), con backend en Node/Express y frontend estático en HTML/CSS/JS.

## Tabla de contenidos
- Resumen
- Requisitos
- Instalación rápida
- Estructura del repositorio
- Descripción de componentes
- API: endpoints y ejemplos
- Esquemas de datos (JSON)
- Frontend: flujo y archivos clave
- Ejecución local
- Despliegue (sugerencia)
- Pruebas y depuración
- Buenas prácticas
- Contribuir
- Contacto y créditos
- Licencia

---

## Resumen

Servitech es un proyecto modular con separación clara entre rutas, controladores y datos (JSON). El frontend consume la API a través de `fetch` y es fácilmente desplegable como sitio estático.

---

## Requisitos

- Node.js >= 18 (probado con v24)
- npm
- Navegador moderno

---

## Instalación rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/sugga222/tp1_prog3.git
cd tp1_prog3

# 2. Instalar dependencias
npm install
```

- Variables de entorno opcionales (crear `.env`):

```
PORT=3000
```

---

## Estructura del repositorio (resumen)

- `server.js` — Punto de entrada (levanta la app).
- `app.js` — Configuración Express (middlewares + montaje de rutas).
- `package.json` — Dependencias y scripts.
- `routes/` — Definición de rutas HTTP.
- `controllers/` — Lógica que usa los JSON.
- `data/` — Base de datos en archivos JSON (servicios, equipo, usuarios, perfiles).
- `frontend/site/` — HTML, CSS y JS del cliente.
	- `frontend/site/css/styles.css`
	- `frontend/site/js/config.js`
	- `frontend/site/index.html` (home)
	- Otras páginas: `servicios.html`, `equipo.html`, `pedido.html`, `contacto.html`, `login.html`, `registro.html`, `faq.html`, `perfil.html`

---

## Descripción de componentes (detallada)

- **`server.js`**: importa la app (`require('./app')`) y llama a `app.listen(PORT)`. Único archivo que ejecutas en producción.
- **`app.js`**: configura middlewares (`cors()`, `express.json()`), rutas `app.use('/servicios', ...)`, manejo básico de errores y exporta la instancia Express.
- **`routes/*.js`**: cada archivo exporta un `Router` que mapea endpoints a funciones del `controller`.
	- Ejemplo: `routes/serviciosRoutes.js` → `GET /` llama a `serviciosController.obtenerServicios`.
- **`controllers/*.js`**: funciones asincrónicas que leen archivos JSON con `fs.promises.readFile`, validan y devuelven respuestas con códigos HTTP adecuados (200, 400, 404, 500).
- **`data/*.json`**: archivos con arrays de objetos. Se usan como DB simple para el TP.
- **Frontend JS**: todos importan primero `frontend/site/js/config.js` que define `CONFIG.API_URL`. Luego `servicios.js`, `equipo.js`, `login.js`, `perfil.js`, `validaciones.js` realizan `fetch` hacia la API e inyectan contenido en el DOM.

---

## API — Endpoints, ejemplos y errores comunes

- Base: `http://localhost:3000` (configurable en `frontend/site/js/config.js`)

- **GET /servicios**
	- Descripción: retorna todos los servicios.
	- Respuesta 200:

```json
[
	{ "id": 1, "nombre": "Desarrollo Web", "descripcion": "Descripción...", "precio": "Consultar" }
]
```

- **GET /servicios/:id**
	- Descripción: retorna servicio por id.
	- Respuesta 200: objeto servicio | 404 si no existe.

- **GET /equipo**
	- Descripción: lista integrantes del equipo.
	- Respuesta 200: array de miembros `{ id, nombre, rol, email, bio? }`.

- **GET /perfil/:id**
	- Descripción: devuelve datos de perfil de usuario.
	- Respuesta 200: `{ id, nombre, email, fechaRegistro, avatar? }` o 404.

- **POST /login**
	- Body (JSON): `{ "email":"x@x.com", "password":"secreto" }`
	- Respuesta 200: objeto usuario (sin password) o 401 si falla.

**Errores comunes**:
- CORS: si frontend y backend corren en puertos diferentes, confirmar `cors()` activo en `app.js`.
- Rutas 404: validar que `fetch` apunte a `CONFIG.API_URL` correcto.
- JSON parsing: los controladores usan `utf-8` al leer archivos; evitar archivos JSON mal formados.

---

## Esquemas de datos (ejemplos representativos)

- `data/servicios.json` (array)

```json
[
	{
		"id": 1,
		"nombre": "Desarrollo Web",
		"descripcion": "Landing pages y sitios multipágina.",
		"precio": "Consultar",
		"categoria": "web"
	}
]
```

- `data/equipo.json`

```json
[
	{ "id": 1, "nombre": "Agustin", "rol": "Frontend Developer", "email": "gonagus.fran11@gmail.com" },
	{ "id": 2, "nombre": "Manuel", "rol": "Backend Developer", "email": "manuaguilar420@gmail.com" }
]
```

- `data/usuarios.json`

```json
[
	{ "id":1, "email":"usuario@example.com", "password":"hashed-or-plain" }
]
```

> Nota: Para un TP está bien usar plain-text en local, pero para producción usar hashing (`bcrypt`) y no guardar contraseñas en texto plano.

---

## Frontend: flujo y archivos clave

- `frontend/site/js/config.js`: centraliza `API_URL`. Cambia aquí para apuntar a producción.
- Páginas principales:
	- `index.html`: hero, llamada para mostrar `equipo` corto y botones CTA.
	- `servicios.html`: lista principal + contenedor `#contenedor-servicios` poblado por `servicios.js`.
	- `pedido.html`: formulario, validado por `validaciones.js` y hace POST (simulado o hacia un endpoint si existe).
- **Accesibilidad**: skip-link, `aria-labels` y estructura semántica (`main`, `section`, `article`).

---

## Ejecución local (paso a paso y comandos)

- Backend:

```bash
# desde la raíz del repo
npm install
node server.js
# o si package.json define "start": "node server.js"
npm start
```

- Frontend (desde `frontend/site`):

```bash
# opción 1: PowerShell script (si existe)
.\scripts\serve.ps1

# opción 2: Python simple server
cd frontend/site
python -m http.server 8000
# abrir http://localhost:8000
```

- Verificar:
	- Backend: abrir `http://localhost:3000/servicios` devuelve JSON.
	- Frontend: abrir `http://localhost:8000` muestra el sitio y las llamadas fetch funcionan.

---

## Despliegue (sugerencia rápida)

- Backend: usar Render, Railway o Heroku. Subir repo, configurar `start` en `package.json` y variables de entorno.
- Frontend: desplegar en Netlify, Vercel o incluso servir desde la carpeta `frontend/site` como sitio estático.
- Si subes ambos, actualizar `frontend/site/js/config.js` con la URL pública de la API.

---

## Pruebas y depuración

- Probar endpoints con `curl` o Postman:

```bash
curl http://localhost:3000/servicios
curl -X POST -H "Content-Type: application/json" -d '{"email":"a@b","password":"c"}' http://localhost:3000/login
```

- Logs: agregar `console.log` en controladores para rastrear errores.
- Validaciones: revisar `validaciones.js` en frontend para cubrir casos (email inválido, campos requeridos).
- Comprobación de CORS: si falla, inspeccionar consola del navegador y el middleware `cors()`.

---

## Buenas prácticas recomendadas

- No guardar contraseñas en texto plano (usar `bcrypt`).
- Validar inputs tanto en frontend como backend.
- Pasar a una DB real (SQLite o Mongo) si el proyecto crece.
- Añadir tests unitarios para controllers (jest/supertest).
- Añadir `helmet` para cabeceras de seguridad si se expone a internet.

---

## Contribuir

- Flow recomendado:
	- Crear branch: `git checkout -b feature/nombre`
	- Hacer commit pequeños y descriptivos.
	- Abrir Pull Request contra `main`.
- Añadir sección `CONTRIBUTING.md` con convenciones de commit si se desea.

---

## Contacto y créditos

- Autores: Agus (Frontend), Manu (Backend).
- Emails de ejemplo: `gonagus.fran11@gmail.com`, `manuaguilar420@gmail.com`.

---

## Licencia

- Añadir archivo `LICENSE` si deseas elegir una licencia (MIT recomendable para ejercicios académicos).


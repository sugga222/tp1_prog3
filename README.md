# Servitech - Soluciones Digitales

## Trabajo Práctico N°3 - Programación III

Aplicación web desarrollada utilizando Node.js, Express, HTML, CSS y JavaScript.

El proyecto implementa una arquitectura cliente-servidor donde el frontend consume una API REST desarrollada en Express para visualizar información sobre servicios, equipo de trabajo y perfiles de usuarios.

---

# Integrantes

### Agustín González

* Rol principal: Frontend Developer
* Email: [gonagus.fran11@gmail.com](mailto:gonagus.fran11@gmail.com)

### Manuel Aguilar

* Rol principal: Backend Developer
* Email: [manuaguilar420@gmail.com](mailto:manuaguilar420@gmail.com)

---

# Tecnologías utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Control de versiones

* Git
* GitHub

---

# Funcionalidades implementadas

## Frontend

* Página principal.
* Catálogo de servicios.
* Información del equipo.
* Formulario de contacto.
* Formulario de pedido de servicios.
* Inicio de sesión.
* Registro de usuarios.
* Perfil de usuario.
* Preguntas frecuentes.

## Backend

* API REST desarrollada con Express.
* Lectura de datos desde archivos JSON.
* Rutas organizadas por módulo.
* Controladores independientes.
* Respuestas en formato JSON.
* Manejo de errores HTTP.

---

# Estructura del proyecto

```text
controladores/
│
├── equipoController.js
├── loginController.js
├── perfilController.js
├── registroController.js
└── serviciosController.js

datos/
│
├── equipo.json
├── perfiles.json
├── servicios.json
└── usuarios.json

rutas/
│
├── equipoRoutes.js
├── loginRoutes.js
├── perfilRoutes.js
├── registroRoutes.js
└── serviciosRoutes.js

sitio/
└── frontend/
    │
    ├── assets/
    ├── css/
    ├── js/
    │
    ├── index.html
    ├── servicios.html
    ├── equipo.html
    ├── pedido.html
    ├── contacto.html
    ├── login.html
    ├── registro.html
    ├── perfil.html
    └── faq.html

app.js
server.js
package.json
README.md
```

---

# API REST

## Servicios

### Obtener todos los servicios

```http
GET /servicios
```

### Obtener un servicio por ID

```http
GET /servicios/:id
```

---

## Equipo

### Obtener integrantes

```http
GET /equipo
```

---

## Perfil

### Obtener perfil por ID

```http
GET /perfil/:id
```

---

## Login

### Iniciar sesión

```http
POST /login
```

---

## Registro

### Registrar usuario

```http
POST /registro
```

---

# Almacenamiento de datos

La aplicación utiliza archivos JSON como fuente de datos.

Archivos utilizados:

* servicios.json
* equipo.json
* perfiles.json
* usuarios.json

Esta solución fue implementada con fines académicos para cumplir los requerimientos del trabajo práctico.

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/sugga222/tp1_prog3
```

## Ingresar al proyecto

```bash
cd tp1_prog3
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar servidor

```bash
npm start
```

o

```bash
node server.js
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
```

---

# Ejecución local

Una vez iniciado el servidor:

```text
http://localhost:3000
```

Los endpoints de la API estarán disponibles desde dicha dirección.

---

# Metodología de trabajo

Para el desarrollo del proyecto se utilizó Git y GitHub mediante trabajo colaborativo basado en ramas.

## Ramas utilizadas

* main
* dev
* feature-frontend-agustin
* feature-backend-manuel

## Flujo de trabajo

1. Desarrollo individual en ramas feature.
2. Integración mediante Pull Requests.
3. Revisión de cambios.
4. Merge hacia la rama principal.

---

# Pull Requests

Durante el desarrollo se realizaron Pull Requests para integrar funcionalidades desarrolladas en ramas independientes hacia la rama principal del proyecto.

---

# Distribución de tareas

## Agustín González

* Desarrollo del frontend.
* Diseño y maquetación de interfaces.
* Implementación HTML, CSS y JavaScript.
* Integración visual de la aplicación.

## Manuel Aguilar

* Desarrollo del backend.
* Implementación de la API REST.
* Creación de rutas y controladores.
* Gestión de datos mediante archivos JSON.

---

# Estado del proyecto

Proyecto finalizado y funcional.

Incluye frontend integrado con backend mediante API REST, control de versiones con Git y trabajo colaborativo utilizando GitHub.

---

# Licencia

Proyecto desarrollado con fines académicos para la materia Programación III.

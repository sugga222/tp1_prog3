# TP3 - Backend Node.js + API REST

Este proyecto es una **API REST** desarrollada con **Node.js** y **Express**.

## 👥 Grupo e Integrantes

- **Nombre Grupo**: [Completar con tu número de grupo]
- **Integrantes**: [Tu nombre]
- **Proyecto**: Aplicación de Servicios Profesionales

## Estructura del Proyecto

### Backend (API REST)
- `server.js` - Archivo principal que inicia la aplicación
- `controllers/` - Lógica de negocio para cada recurso
  - `serviciosController.js` - Operaciones GET de servicios
  - `loginController.js` - Autenticación de usuarios
  - `registroController.js` - Registro de nuevos usuarios
  - `equipoController.js` - Información del equipo
  - `perfilController.js` - Perfiles de usuarios
- `routes/` - Definición de rutas y endpoints
  - `serviciosRoutes.js` - GET /servicios, GET /servicios/:id
  - `loginRoutes.js` - POST /login
  - `registroRoutes.js` - POST /registro
  - `equipoRoutes.js` - GET /equipo
  - `perfilRoutes.js` - GET /perfil/:id
- `data/` - Base de datos simulada con JSON
  - `servicios.json` - 14 servicios (cumple requisito >13)
  - `usuarios.json` - Usuarios registrados
  - `equipo.json` - Integrantes del equipo
  - `perfiles.json` - Perfiles con últimos 3 pedidos

### Frontend (TP1)
- `pages/` - Páginas HTML
- `js/` - JavaScript para consumir API
- `css/` - Estilos
- `assets/` - Imágenes

## Cómo está organizado

### Flujo de una Solicitud
1. Cliente hace una solicitud (ej: `GET /servicios`)
2. `server.js` recibe en Express
3. Middleware CORS valida el origen
4. Middleware JSON parsea el body
5. Se enruta a `/routes/serviciosRoutes.js`
6. Se ejecuta el controller correspondiente
7. El controller lee el archivo JSON en `/data/`
8. Responde con JSON y código HTTP

### Validaciones Implementadas
- **Email válido**: Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **ID numérico**: `isNaN()` para verificar
- **Campos requeridos**: Verificación con `if (!campo)`
- **Email no duplicado**: Check en `registroController`
- **Credenciales correctas**: Búsqueda en array de usuarios
- **Manejo de errores**: try/catch en todos los endpoints

### Códigos HTTP Utilizados
- `200` - OK (solicitud exitosa)
- `201` - Created (recurso creado)
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (credenciales incorrectas)
- `404` - Not Found (recurso no existe)
- `409` - Conflict (email duplicado)
- `500` - Server Error (error interno)

## Cómo Ejecutar

Abrí `index.html` con doble click (o “Abrir con” tu navegador).


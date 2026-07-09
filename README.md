# Sesion 2 - API de Tareas (HTTPS)

## Lo que se hizo
- Se configuro servidor HTTPS con certificado local.
- Se activo Helmet para cabeceras de seguridad.
- Se creo el modulo de tareas con rutas CRUD en Express.
- Se agrego validacion de entradas con express-validator en POST y PUT.
- Se manejaron respuestas con codigos HTTP segun el resultado de cada operacion.

## Estructura del proyecto
- index.js: levanta el servidor HTTPS.
- server.js: configura Express, middleware y monta rutas.
- routes/tareas.js: define endpoints de tareas.
- models/tareas.js: modelo en memoria para CRUD de tareas.

## Endpoints de tareas
Base URL: https://localhost:3000/api/tareas

- GET /api/tareas
- GET /api/tareas/:id
- POST /api/tareas
- PUT /api/tareas/:id
- DELETE /api/tareas/:id

## Validacion de entradas (POST/PUT)
Se usa express-validator en routes/tareas.js.
- POST valida titulo.
- PUT valida id, titulo y completada.
- Cuando hay errores de validacion, el API responde 400 con el detalle de errores.

## Diferencia entre 200, 201, 400 y 404
- 200 OK: la solicitud fue correcta y el servidor devuelve informacion solicitada o confirmacion de actualizacion.
  - Ejemplo: GET de tareas, PUT exitoso.

- 201 Created: la solicitud fue correcta y se creo un nuevo recurso.
  - Ejemplo: POST de nueva tarea.

- 400 Bad Request: la solicitud llego al servidor, pero tiene datos invalidos o mal formados.
  - Ejemplo: POST sin titulo, PUT con completada como texto.

- 404 Not Found: el recurso solicitado no existe.
  - Ejemplo: GET, PUT o DELETE con id que no existe.

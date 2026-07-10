# Sesion 2 y 3 - API de Tareas (HTTPS) + Clima Externo

## Sesion 2 - Lo que se hizo
- Se configuro servidor HTTPS con certificado local.
- Se activo Helmet para cabeceras de seguridad.
- Se creo el modulo de tareas con rutas CRUD en Express.
- Se agrego validacion de entradas con express-validator en POST y PUT.
- Se manejaron respuestas con codigos HTTP segun el resultado de cada operacion.

## Sesion 3 - Lo que se hizo
- Se integro servicio externo OpenWeatherMap API para obtener datos de clima.
- Se creo ruta independiente GET /api/clima/:ciudad que valida y devuelve clima.
- Se creo ruta GET /api/tareas/:id/clima que combina tarea propia con clima externo.
- Se agrego validacion con express-validator (solo letras, no espacios) en parametro ciudad.
- Se implemento manejo de errores HTTP 502 Bad Gateway para fallos del servicio externo.
- Se configuro timeout de 5000ms en axios para evitar bloqueos prolongados.
- Se documentaron ambos endpoints en Swagger/OpenAPI.
- Se agregaron explicaciones de diferencias entre codigos HTTP 404 vs 502.

## Estructura del proyecto
- index.js: levanta el servidor HTTPS.
- server.js: configura Express, middleware y monta rutas.
- routes/tareas.js: define endpoints de tareas.
- routes/clima.js: define endpoints de clima.
- services/clima.js: servicio que llama a la API externa de clima.
- models/tareas.js: modelo en memoria para CRUD de tareas.

## Endpoints de tareas
Base URL: https://localhost:3000/api/tareas

- GET /api/tareas
- GET /api/tareas/:id
- POST /api/tareas
- PUT /api/tareas/:id
- DELETE /api/tareas/:id

## Documentacion Swagger
- URL: https://localhost:3000/api-docs
- Especificacion OpenAPI: swagger.yaml

## Validacion de entradas (POST/PUT)
Se usa express-validator en routes/tareas.js.
- POST valida titulo.
- PUT valida id, titulo y completada.
- Cuando hay errores de validacion, el API responde 400 con el detalle de errores.

## Endpoints de clima
Base URL: https://localhost:3000/api/clima

- GET /api/clima/:ciudad - Obtiene clima de una ciudad (requiere solo letras sin espacios).
- GET /api/tareas/:id/clima?ciudad=X - Obtiene una tarea y su clima asociado.

### Validacion de clima
Se usa express-validator en routes/clima.js.
- :ciudad debe contener solo letras (validacion isAlpha).
- Si está vacío o tiene caracteres inválidos, responde 400.
- Si el servicio externo falla, responde 502.

## Diferencia entre 200, 201, 400, 404 y 502
- 200 OK: la solicitud fue correcta y el servidor devuelve informacion solicitada o confirmacion de actualizacion.
  - Ejemplo: GET de tareas, PUT exitoso.

- 201 Created: la solicitud fue correcta y se creo un nuevo recurso.
  - Ejemplo: POST de nueva tarea.

- 400 Bad Request: la solicitud llego al servidor, pero tiene datos invalidos o mal formados.
  - Ejemplo: POST sin titulo, PUT con completada como texto.

- 404 Not Found: el recurso solicitado no existe (problema del cliente o dato faltante).
  - Ejemplo: GET, PUT o DELETE con id que no existe en la BD.
  - El servidor respondió correctamente, pero el recurso no está disponible.

- 502 Bad Gateway: el servidor intentó contactar un servicio externo y falló (problema del servicio externo).
  - Ejemplo: GET /api/clima/Toluca pero OpenWeatherMap está caído o no responde.
  - Tu API está bien, pero no puede cumplir la solicitud porque el servicio externo falla.
  - El timeout de 5000ms en axios también genera 502 si la respuesta tarda más.

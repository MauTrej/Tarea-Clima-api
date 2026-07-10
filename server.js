import "dotenv/config"; 
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { body, validationResult } from "express-validator";
import tareasRouter from "./routes/tareas.js";
import climaRouter from "./routes/clima.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express(); 
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(helmet()); // cabeceras de seguridad HTTP
app.use(express.json()); // parseo seguro de JSON
app.use(morgan("dev")); // bitácora de peticiones
app.use("/api/tareas", tareasRouter);
app.use("/api/clima", climaRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*/ Ruta de prueba con validación de entrada
app.post(
  "/api/echo",
  body("mensaje").isString().trim().isLength({ min: 1, max: 200 }).escape(),
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    res.json({ recibido: req.body.mensaje });
  },
);

app.get("/api/salud", (req, res) => {
  res.json({ status: "ok" });
});

// Principio: Input Validation (OWASP) — toda entrada del usuario se valida
// en el servidor para prevenir datos maliciosos o malformados.
app.post(
  "/api/registro",
  body("nombre").notEmpty().withMessage("El nombre no puede estar vacio").trim().escape(),
  body("correo").isEmail().withMessage("El correo debe de ser un correo valido").normalizeEmail(),
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    res.json({nombre: req.body.nombre, correo: req.body.correo})
  },
);*/
export default app;

import express from "express";
import { body, param, validationResult } from "express-validator";
import { obtenerClima } from "../services/clima.js";

const router = express.Router();

function validar(req, res, next) {
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });
  next();
}

// GET /api/clima/:ciudad - Obtener clima de una ciudad
router.get(
  '/:ciudad',
  param('ciudad')
    .trim()
    .notEmpty().withMessage('La ciudad no puede estar vacía')
    .isAlpha('es-ES').withMessage('La ciudad debe contener solo letras'),
  validar,
  async (req, res) => {
    try {
      const { ciudad } = req.params;
      const clima = await obtenerClima(ciudad);
      res.status(200).json(clima);
    } catch (error) {
      console.error('Error al obtener clima:', error.message);
      res.status(502).json({ error: 'Error del servicio externo de clima' });
    }
  }
);

export default router;
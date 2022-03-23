const express = require('express');
const router = express.Router();

const {
  crearPartido,
  obtenerPartidos,
  actualizarPartido,
  eliminarPartido,
} = require('../controllers/match.controller');
const validateToken = require('../middlewares/validateToken');
const validateRol = require('../middlewares/validateRol');

router
  .route('/')
  .get(obtenerPartidos)
  .post(validateToken, validateRol, crearPartido)
  .put(validateToken, validateRol, actualizarPartido)
  .delete(validateToken, validateRol, eliminarPartido);

module.exports = router;

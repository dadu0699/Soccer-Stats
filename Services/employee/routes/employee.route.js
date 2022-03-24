const express = require('express');
const router = express.Router();

const {
  transferirJugador,
  logTransferenciaJugador,
  transferirDirectorTecnico,
  logTransferenciaDirectorTecnico,
  agregarIncidencia,
} = require('../controllers/employee.controller');
const validateToken = require('../middlewares/validateToken');
const validateRol = require('../middlewares/validateRol');

router
  .route('/player-transfer')
  .get(logTransferenciaJugador)
  .post(validateToken, validateRol, transferirJugador);

router
  .route('/technical-director-transfer')
  .get(logTransferenciaDirectorTecnico)
  .post(validateToken, validateRol, transferirDirectorTecnico);

router.route('/incidence').post(validateToken, validateRol, agregarIncidencia);

module.exports = router;

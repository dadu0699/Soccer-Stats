const express = require('express');
const router = express.Router();

const {
  transferirJugador,
  logTransferenciaJugador,
  transferirDirectorTecnico,
  logTransferenciaDirectorTecnico,
  agregarIncidencia
} = require('../controllers/employee.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/player-transfer').post(validateToken, transferirJugador);
router.route('/player-transfer').get(logTransferenciaJugador);
router.route('/technical-director-transfer').post(validateToken, transferirDirectorTecnico);
router.route('/technical-director-transfer').get(logTransferenciaDirectorTecnico);
router.route('/incidence').post(agregarIncidencia);



module.exports = router;

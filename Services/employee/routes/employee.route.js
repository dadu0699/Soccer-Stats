const express = require('express');
const router = express.Router();

const {
  transferirJugador,
  logTransferenciaJugador,
  transferirDirectorTecnico,
  logTransferenciaDirectorTecnico
} = require('../controllers/employee.controller');

router.route('/player-transfer').post(transferirJugador);
router.route('/player-transfer').get(logTransferenciaJugador);
router.route('/technical-director-transfer').post(transferirDirectorTecnico);
router.route('/technical-director-transfer').get(logTransferenciaDirectorTecnico);


module.exports = router;

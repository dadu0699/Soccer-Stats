const express = require('express');
const router = express.Router();

const {
  transferirJugador,
  logTransferenciaJugador,
  transferirDirectorTecnico,
  logTransferenciaDirectorTecnico
} = require('../controllers/employee.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/player-transfer').post(validateToken, transferirJugador);
router.route('/player-transfer').get(logTransferenciaJugador);
router.route('/technical-director-transfer').post(validateToken, transferirDirectorTecnico);
router.route('/technical-director-transfer').get(logTransferenciaDirectorTecnico);


module.exports = router;

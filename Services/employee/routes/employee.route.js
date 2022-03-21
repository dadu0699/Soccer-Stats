const express = require('express');
const router = express.Router();

const {
  transferirJugador,
  logTransferenciaJugador
} = require('../controllers/employee.controller');

router.route('/player-transfer').post(transferirJugador);
router.route('/player-transfer').get(logTransferenciaJugador);


module.exports = router;

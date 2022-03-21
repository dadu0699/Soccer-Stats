const express = require('express');
const router = express.Router();

const {
  transferirJugador,
} = require('../controllers/employee.controller');

router.route('/player-transfer').post(transferirJugador);

module.exports = router;

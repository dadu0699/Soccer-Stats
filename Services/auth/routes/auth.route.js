const express = require('express');
const router = express.Router();

const {
  validarCuenta,
  iniciarSesion,
} = require('../controllers/auth.controller');

router.route('/').post(iniciarSesion).get(validarCuenta);

module.exports = router;

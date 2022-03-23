const express = require('express');
const router = express.Router();

const {
  validarCuenta,
  iniciarSesion,
  temporalPassword,
  restablecerPassword,
} = require('../controllers/auth.controller');

router.route('/').post(iniciarSesion).get(validarCuenta);
router.route('/temporal-password').post(temporalPassword);
router.route('/reset-password').post(restablecerPassword);

module.exports = router;

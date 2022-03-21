const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerPerfil,
  actualizarPerfil,
  eliminarCuenta,
} = require('../controllers/customer.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/register').post(crearUsuario);
router.route('/').get(validateToken, obtenerPerfil)
router.route('/').put(validateToken, actualizarPerfil)
router.route('/').delete(validateToken, eliminarCuenta)


module.exports = router;

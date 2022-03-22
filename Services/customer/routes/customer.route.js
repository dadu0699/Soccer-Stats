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

router
  .route('/')
  .get(validateToken, obtenerPerfil)
  .put(validateToken, actualizarPerfil)
  .delete(validateToken, eliminarCuenta);

module.exports = router;

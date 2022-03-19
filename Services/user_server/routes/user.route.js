const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerPaises,
  validarCuenta,
  obtenerPerfil,
  iniciarSesion,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/login').post(iniciarSesion);
router.route('/add').post(crearUsuario);
router.route('/countries').get(obtenerPaises);
router.route('/client/check/:id').get(validarCuenta)
router.route('/client/:id').get(validateToken, obtenerPerfil)

module.exports = router;
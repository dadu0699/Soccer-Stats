const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerPaises,
  validarCuenta,
  obtenerPerfil,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/add').post(crearUsuario);
router.route('/countries').get(obtenerPaises);
router.route('/client/:id').get(validarCuenta)
router.route('/client/profile/:id').get(validateToken, obtenerPerfil)

module.exports = router;
const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerPerfil,
  actualizarPerfil,
  eliminarCuenta,
} = require('../controllers/customer.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/add').post(crearUsuario);
router.route('/client/:id').get(validateToken, obtenerPerfil)
router.route('/client/update').put(validateToken, actualizarPerfil)
router.route('/delete').delete(validateToken, eliminarCuenta)


module.exports = router;

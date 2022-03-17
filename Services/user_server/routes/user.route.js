const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerPaises,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/add').post(crearUsuario);
router.route('/countries').get(obtenerPaises);


module.exports = router;
const express = require('express');
const router = express.Router();

const {
  crearNoticia,
  obtenerNoticias,
  obtenerNoticiasPorEquipo,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');
const validateRol = require('../middlewares/validateRol');

router
  .route('/')
  .get(obtenerNoticias)
  .post(validateToken, validateRol, crearNoticia);

router.route('/team').get(obtenerNoticiasPorEquipo);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  crearNoticia,
  obtenerNoticias,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');
const validateRol = require('../middlewares/validateRol');

router
  .route('/')
  .get(obtenerNoticias)
  .post(validateToken, validateRol, crearNoticia);

module.exports = router;

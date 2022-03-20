const express = require('express');
const router = express.Router();

const {
  crearNoticia,
  obtenerNoticias,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');

router.route('/').post(validateToken, crearNoticia);
router.route('/').get(validateToken, obtenerNoticias);


module.exports = router;

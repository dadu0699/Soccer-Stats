const express = require('express');
const router = express.Router();

const {
  crearNoticia,
  obtenerNoticias,
} = require('../controllers/post.controller');

router.route('/').post(crearNoticia);
router.route('/').get(obtenerNoticias);


module.exports = router;
